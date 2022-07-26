from flask import Blueprint, request, jsonify, session

bp = Blueprint('user', __name__, url_prefix='/user')