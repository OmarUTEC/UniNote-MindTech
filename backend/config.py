class Config:
    SECRET_KEY = "uninote.com"
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:admin123@localhost/uninote_db'
    #SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:postgres123@rds-mindtech1.c2ub2vsbabtm.us-east-1.rds.amazonaws.com:5432/uninote_db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    GOOGLE_CLIENT_ID = "286520809894-2i2v2dtinu2o4qfgdomj4lf0i1tdu56f.apps.googleusercontent.com"
