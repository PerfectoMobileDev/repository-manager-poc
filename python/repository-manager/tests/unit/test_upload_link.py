import pytest
import upload-link as ul

def test__get_upload_link():
    ul.get_upload_link('test-bucket','/myfolder/myfile')