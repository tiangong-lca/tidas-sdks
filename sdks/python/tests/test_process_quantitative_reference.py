import json
from pathlib import Path

from jsonschema import Draft7Validator, RefResolver
from pydantic import ValidationError
import pytest

from tidas_sdk.core.multilang import MultiLangList
from tidas_sdk.generated.tidas_processes import (
    ProcessDataSetModellingAndValidationLCIMethodAndAllocation,
    ProcessDataSetProcessInformationQuantitativeReference,
)


SCHEMA_ROOT = Path(__file__).parents[1] / "src" / "tidas_sdk" / "schemas"
BASIS = [
    {"@xml:lang": "en", "#text": "1 tonne unwashed raw coal"},
    {"@xml:lang": "zh", "#text": "1 吨未经洗选的原煤"},
]


def _field_validator(field: str) -> Draft7Validator:
    schema = json.loads((SCHEMA_ROOT / "tidas_processes.json").read_text())
    data_types = json.loads((SCHEMA_ROOT / "tidas_data_types.json").read_text())
    process = schema["properties"]["processDataSet"]["properties"]
    if field == "quantitativeReference":
        target = process["processInformation"]["properties"][field]
    else:
        target = process["modellingAndValidation"]["properties"][field]
    resolver = RefResolver.from_schema(
        schema,
        store={"tidas_data_types.json": data_types, "/tidas_data_types.json": data_types},
    )
    return Draft7Validator(target, resolver=resolver)


def test_non_flow_basis_is_typed_and_schema_valid_without_reference_flow() -> None:
    schema = _field_validator("quantitativeReference")
    for kind in ("Other parameter", "Functional unit", "Production period"):
        payload = {"@type": kind, "functionalUnitOrOther": BASIS}
        assert schema.is_valid(payload)
        assert not schema.is_valid({"@type": kind})
        model = ProcessDataSetProcessInformationQuantitativeReference.model_validate(
            {**payload, "functionalUnitOrOther": MultiLangList(BASIS)}
        )
        assert model.reference_to_reference_flow is None
        assert len(model.functional_unit_or_other) == 2
        with pytest.raises(ValidationError, match="requires functionalUnitOrOther"):
            ProcessDataSetProcessInformationQuantitativeReference.model_validate(
                {"@type": kind}
            )


def test_flow_reference_remains_required_and_process_type_is_optional() -> None:
    reference = _field_validator("quantitativeReference")
    assert not reference.is_valid({"@type": "Reference flow(s)"})
    with pytest.raises(ValidationError, match="requires referenceToReferenceFlow"):
        ProcessDataSetProcessInformationQuantitativeReference.model_validate(
            {"@type": "Reference flow(s)"}
        )
    assert reference.is_valid({"@type": "Reference flow(s)", "referenceToReferenceFlow": "1"})
    process_type = _field_validator("LCIMethodAndAllocation")
    assert process_type.is_valid({})
    assert process_type.is_valid({"typeOfDataSet": "Unit process, single operation"})
    assert not process_type.is_valid({"typeOfDataSet": "invented type"})
    model = ProcessDataSetModellingAndValidationLCIMethodAndAllocation.model_validate({})
    assert model.type_of_data_set is None
