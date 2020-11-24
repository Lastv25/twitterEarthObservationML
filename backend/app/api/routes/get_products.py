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

router = APIRouter()

def get_scihub_url(json_parameters):
    base_url = 'https://scihub.copernicus.eu/dhus/search?q='

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

    return res


@router.get("/products/{collection_id}", response_model=List[str], name="collections:get-products-from-parameter")
async def get_collections_by_id(
    collection_id: int = Path(..., ge=1),

    collection_repo: CollectionsRepository = Depends(get_repository(CollectionsRepository))) -> List[str]:

    collection = await collection_repo.get_collection_by_id(id=collection_id)

    parameters = json.loads(collection.parameters)
    scihub_parameters = parameters['platform']['scihub']
    egeos_parameters = parameters['platform']['egeos']

    r = requests.get(get_scihub_url(scihub_parameters), auth=('Lastv', 'bonjour_moi'))



    return [r.text]
