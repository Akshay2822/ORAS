```sql

-- create new database
create database project_db;
use project_db;


-- tables

-- user
create table user(
    id integer primary key auto_increment,
    fullName varchar(20),
    email varchar(20),
    phone varchar(10),
    password varchar(100),
    profileImage varchar(100),

    createdTimestamp timestamp DEFAULT CURRENT_TIMESTAMP
);

-- home

-- type:
    -- 1: flat,
    -- 2: house,
 
create table home (
    id integer primary key auto_increment,
    userId integer,
    type integer,
    addressLine1 varchar(50),
    addressLine2 varchar(50),
    addressLine3 varchar(50),
    city varchar(50),
    state varchar(50),
    zipCode varchar(6),

    bedrooms integer,
    bathrooms integer,

    title varchar(100),
    shortDescription varchar(500),
    longDescription varchar(10000),

    image varchar(100),

    rent integer,

    createdTimestamp timestamp DEFAULT CURRENT_TIMESTAMP
);

-- home photos
create table photo (
    id integer primary key auto_increment,
    homeId integer,
    fileName varchar(100),
    createdTimestamp timestamp DEFAULT CURRENT_TIMESTAMP
);

-- home ratings
create table rating (
    id integer primary key auto_increment,
    homeId integer,
    userId integer,
    rating integer,
    comment varchar(1000),

    createdTimestamp timestamp DEFAULT CURRENT_TIMESTAMP
);

-- booking
-- wishlist
create table wishlist (
    id integer primary key auto_increment,
    homeId integer,
    userId integer,
    createdTimestamp timestamp DEFAULT CURRENT_TIMESTAMP
);
