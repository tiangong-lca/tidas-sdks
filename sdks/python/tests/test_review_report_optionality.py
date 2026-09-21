import json
from pathlib import Path
from typing import Any

import pytest
from jsonschema import Draft7Validator, RefResolver
from pydantic import ValidationError

from tidas_sdk.generated.tidas_processes import (
    ProcessDataSetModellingAndValidationValidation,
    ProcessReview,
)


SCHEMA_ROOT = Path(__file__).parents[1] / "src" / "tidas_sdk" / "schemas"


def _review_validator(dataset_type: str) -> Draft7Validator:
    data_types = json.loads((SCHEMA_ROOT / "tidas_data_types.json").read_text())
    schema = json.loads((SCHEMA_ROOT / f"tidas_{dataset_type}.json").read_text())
    if dataset_type == "processes":
        review = schema["properties"]["processDataSet"]["properties"][
            "modellingAndValidation"
        ]["properties"]["validation"]["properties"]["review"]
    else:
        review = schema["properties"]["LCIAMethodDataSet"]["properties"][
            "modellingAndValidation"
        ]["properties"]["validation"]["properties"]["review"]
    resolver = RefResolver.from_schema(
        schema,
        store={
            "tidas_data_types.json": data_types,
            "/tidas_data_types.json": data_types,
        },
    )
    return Draft7Validator(review, resolver=resolver)


def _leaf_errors(errors):
    for error in errors:
        if error.context:
            yield from _leaf_errors(error.context)
        else:
            yield error


LOCALIZED_TEXT = {"@xml:lang": "en", "#text": "Reviewed documentation"}


def _reference(kind: str) -> dict[str, Any]:
    identifier = "11111111-1111-1111-1111-111111111111" if kind == "contact data set" else "22222222-2222-2222-2222-222222222222"
    directory = "contacts" if kind == "contact data set" else "sources"
    return {
        "@type": kind,
        "@refObjectId": identifier,
        "@version": "01.00.000",
        "@uri": f"../{directory}/{identifier}.xml",
        "common:shortDescription": LOCALIZED_TEXT,
    }


def _review(dataset_type: str) -> dict[str, Any]:
    return {
        "@type": "Independent external review",
        "common:scope": {
            "@name": "Documentation",
            "common:method": {
                "@name": "Documentation" if dataset_type == "processes" else "Expert judgement"
            },
        },
        "common:reviewDetails": LOCALIZED_TEXT,
        "common:referenceToNameOfReviewerAndInstitution": _reference("contact data set"),
    }


@pytest.mark.parametrize("dataset_type", ["processes", "lciamethods"])
def test_complete_review_report_is_optional_but_validated_when_supplied(dataset_type: str) -> None:
    validator = _review_validator(dataset_type)
    review = _review(dataset_type)
    validator.validate(review)
    validator.validate(
        {**review, "common:referenceToCompleteReviewReport": _reference("source data set")}
    )
    incomplete = {
        **review,
        "common:referenceToCompleteReviewReport": {
            "@refObjectId": "22222222-2222-2222-2222-222222222222"
        },
    }
    assert list(validator.iter_errors(incomplete))


@pytest.mark.parametrize("dataset_type", ["processes", "lciamethods"])
def test_other_completed_review_fields_remain_required(dataset_type: str) -> None:
    errors = list(
        _review_validator(dataset_type).iter_errors(
            {"@type": "Independent external review"}
        )
    )
    messages = "\n".join(error.message for error in _leaf_errors(errors))
    for field in (
        "common:scope",
        "common:reviewDetails",
        "common:referenceToNameOfReviewerAndInstitution",
    ):
        assert field in messages


def test_process_review_accepts_singleton_and_ordered_non_empty_arrays() -> None:
    first = {"@type": "Not reviewed"}
    second = {"@type": "Not reviewed"}

    singleton = ProcessDataSetModellingAndValidationValidation.model_validate(
        {"review": first}
    )
    assert isinstance(singleton.review, ProcessReview)
    assert singleton.review.type == "Not reviewed"

    multiple = ProcessDataSetModellingAndValidationValidation.model_validate(
        {"review": [first, second]}
    )
    assert isinstance(multiple.review, list)
    assert [review.type for review in multiple.review] == [
        "Not reviewed",
        "Not reviewed",
    ]

    with pytest.raises(ValidationError):
        ProcessDataSetModellingAndValidationValidation.model_validate({"review": []})


def test_process_review_reports_invalid_second_item_at_index_one() -> None:
    errors = list(
        _review_validator("processes").iter_errors(
            [
                _review("processes"),
                {"@type": "Independent external review"},
            ]
        )
    )
    paths = [list(error.absolute_path) for error in _leaf_errors(errors)]
    messages = "\n".join(error.message for error in _leaf_errors(errors))
    assert paths.count([1]) >= 3
    for field in (
        "common:scope",
        "common:reviewDetails",
        "common:referenceToNameOfReviewerAndInstitution",
    ):
        assert field in messages
