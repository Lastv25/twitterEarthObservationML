from app.db.repositories.collections import CollectionsRepository
from fastapi import Depends, APIRouter, HTTPException, Path, Body, status
from app.models.collections import CollectionCreate, CollectionPublic, CollectionInDB, CollectionUpdate
from app.api.dependencies.auth import get_current_active_user
from app.api.dependencies.database import get_repository
from app.models.user import UserInDB
from starlette.status import HTTP_201_CREATED
from typing import List
import json
import requests
import bs4
import re

router = APIRouter()

def is_scihub_used(scihub_json):
    used = False
    if scihub_json['ingestion_parameter'][0]:
        used = True
    elif scihub_json['sensing_parameter'][0]:
        used = True
    elif scihub_json['mission1'][0]:
        used = True
    elif scihub_json['mission2'][0]:
        used = True
    elif scihub_json['mission3'][0]:
        used = True
    return used

def get_scihub_url(json_parameters):
    base_url = 'https://scihub.copernicus.eu/dhus/search?q='
    res = ''

    if json_parameters['ingestion_parameter'][0]:
        ingestion_query = 'ingestiondate: [' + str(json_parameters['ingestion_parameter'][1]) + ' TO ' +\
                          str(json_parameters['ingestion_parameter'][2]) + ']'
        res = base_url+'('+ingestion_query+')'
    if json_parameters['sensing_parameter'][0]:
        sensing_query = 'beginposition: [' + str(json_parameters['sensing_parameter'][1]) + ' TO ' + \
                          str(json_parameters['sensing_parameter'][2]) + ']'
        res = base_url + '(' + sensing_query + ')'
    if json_parameters['mission1'][0]:
        sentinel1_query = 'platformname:Sentinel-1'
        if len(json_parameters['mission1'][1]) > 0:
            sentinel1_query += ''
        if len(json_parameters['mission1'][2]) > 0:
            sentinel1_query += ' AND producttype:'+json_parameters['mission1'][2]
        if len(json_parameters['mission1'][3]) > 0:
            sentinel1_query += ' AND polarisationmode:'+json_parameters['mission1'][3]
        if len(json_parameters['mission1'][4]) > 0:
            sentinel1_query += ' AND sensoroperationalmode:'+json_parameters['mission1'][4]
        if len(json_parameters['mission1'][5]) > 0:
            sentinel1_query += ' AND relativeorbitnumber:'+json_parameters['mission1'][5]
        res = base_url + '(' + sentinel1_query + ')'

    if len(res) == 0:
        return base_url
    else:
        return res


def scihub_html(html_response):
    soup = bs4.BeautifulSoup(html_response, 'html.parser')
    body = list(soup.children)[1]
    text_prod_numbers = body.find_all('subtitle')[0].get_text()
    products_html = body.find_all('entry')
    products = []
    for i in products_html:
        products.append(str((i.find_all('title')[0].get_text(), i.find_all('link', href=True)[0]['href'])))
    return [str(re.findall('\d+',text_prod_numbers)[2])]+products


@router.get("/products/{collection_id}", response_model=List[str], name="collections:get-products-from-parameter")
async def get_collections_by_id(
    collection_id: int = Path(..., ge=1),
    current_user: UserInDB = Depends(get_current_active_user),
    collection_repo: CollectionsRepository = Depends(get_repository(CollectionsRepository))) -> List[str]:

    collection = await collection_repo.get_collection_by_id(id=collection_id, requesting_user=current_user)

    parameters = json.loads(collection.parameters)
    egeos_parameters = parameters['platform']['egeos']
    scihub_parameters = parameters['platform']['scihub']

    if is_scihub_used(scihub_parameters):
        scihub_request = requests.get(get_scihub_url(scihub_parameters), auth=('Lastv', 'bonjour_moi'))
        scihub_products = scihub_html(scihub_request.content)
        return scihub_products
    else:
        return ['(hello, No products were found )']
