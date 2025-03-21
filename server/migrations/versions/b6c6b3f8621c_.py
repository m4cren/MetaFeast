"""empty message

Revision ID: b6c6b3f8621c
Revises: 
Create Date: 2025-03-18 23:46:17.754113

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b6c6b3f8621c'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('administrator', schema=None) as batch_op:
        batch_op.add_column(sa.Column('admin_name', sa.String(length=126), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('administrator', schema=None) as batch_op:
        batch_op.drop_column('admin_name')

    # ### end Alembic commands ###
