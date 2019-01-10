import pytest
import handlers.upload_link as ul

def test__get_upload_link():
    assert ul.func() == 1
    # ul.get_upload_link('test-bucket','/myfolder/myfile')