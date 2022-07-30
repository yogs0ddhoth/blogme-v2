import sys
import json
from flask import Blueprint, request, jsonify, session
from ariadne import ObjectType, graphql_sync, load_schema_from_path, make_executable_schema, snake_case_fallback_resolvers
from ariadne.constants import PLAYGROUND_HTML
from controllers.queries import get_all_posts_resolver, get_post_resolver
from controllers.mutations import create_post_resolver
from controllers.type_defs import type_defs
from models import Post, Comment, Vote
from db import get_db
from utils.auth import login_required, pass_session
from utils.filters import format_fields

bp = Blueprint('graphql', __name__, url_prefix='/graphql')

query = ObjectType('Query')
mutation = ObjectType('Mutation')

query.set_field('getAllPosts', get_all_posts_resolver)
query.set_field('getPost', get_post_resolver)
mutation.set_field('createPost', create_post_resolver)

schema = make_executable_schema(
  type_defs, query, mutation, snake_case_fallback_resolvers
)

@bp.route('/', methods=['GET'])
def graphql_playground():
  return PLAYGROUND_HTML, 200

@bp.route('/', methods=['POST'])
def graphql_server():
  data = request.get_json()
  success, result = graphql_sync(
    schema, data, context_value=request
  )
  status_code = 200 if success else 400
  return jsonify(result), status_code