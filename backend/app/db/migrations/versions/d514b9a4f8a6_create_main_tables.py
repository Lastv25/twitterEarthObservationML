"""create_main_tables
Revision ID: d514b9a4f8a6
Revises: 
Create Date: 2020-10-23 09:22:02.619057
"""

from alembic import op
import sqlalchemy as sa
import geoalchemy2 as geo

# revision identifiers, used by Alembic
revision = 'd514b9a4f8a6'
down_revision = None
branch_labels = None
depends_on = None

def create_areas_monitored_table() -> None:
    op.create_table(
        "areas_monitored",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("user_id", sa.Integer, nullable=False, index=True),
        sa.Column("coordinates", geo.Geometry('POINT'), nullable=True),
        sa.Column("notifications", sa.Boolean(), nullable=False, server_default="False"),
    )

def upgrade() -> None:
    create_areas_monitored_table()

def downgrade() -> None:
    op.drop_table("areas_monitored")