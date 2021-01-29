"""create_main_tables
Revision ID: d540b742f8fb
Revises:
Create Date: 2021-01-29 08:46:06.274698
"""

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic
revision = 'd540b742f8fb'
down_revision = None
branch_labels = None
depends_on = None

def create_twitter_table() -> None:
    op.create_table(
        "twitter",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("text", sa.Text, nullable=False),
        sa.Column("disaster", sa.Text, nullable=True),
        sa.Column("location", sa.Text, nullable=False),
    )

def upgrade() -> None:
    create_twitter_table()

def downgrade() -> None:
    op.drop_table("twitter")