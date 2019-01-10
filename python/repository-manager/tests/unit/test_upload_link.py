import pytest
import handlers.upload_link as ul
from moto import mock_s3

@mock_s3
def test__get_upload_link():
    ul.get_upload_link('myfolder/myfile','perfecto-repository-dev-us-east-1')