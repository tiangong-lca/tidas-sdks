from __future__ import annotations

import json
from pathlib import Path

from jsonschema import Draft7Validator, FormatChecker


def test_source_digital_file_accepts_opaque_relative_locator() -> None:
    schema_path = (
        Path(__file__).resolve().parents[1]
        / "src"
        / "tidas_sdk"
        / "schemas"
        / "tidas_sources.json"
    )
    schema = json.loads(schema_path.read_text(encoding="utf-8"))
    field = schema["properties"]["sourceDataSet"]["properties"][
        "sourceInformation"
    ]["properties"]["dataSetInformation"]["properties"][
        "referenceToDigitalFile"
    ]
    validator = Draft7Validator(field, format_checker=FormatChecker())

    validator.validate({"@uri": "../external_docs/report.jpg"})
    validator.validate(
        [
            {"@uri": "../external_docs/report.jpg"},
            {"@uri": "https://example.test/report.pdf"},
        ]
    )
