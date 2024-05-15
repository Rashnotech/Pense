"""create table user

Revision ID: 5fed20b8cb92
Revises: e2c25c62f13d
Create Date: 2024-05-15 00:06:16.872619

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from models.user import User


# revision identifiers, used by Alembic.
revision: str = '5fed20b8cb92'
down_revision: Union[str, None] = 'e2c25c62f13d'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    User.__table__.create()


def downgrade() -> None:
    pass
