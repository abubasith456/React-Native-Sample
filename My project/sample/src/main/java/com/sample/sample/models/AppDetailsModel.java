package com.sample.sample.models;

import java.util.ArrayList;
import java.util.Date;

class Owner {
    public String id;
    public String avatar_url;
    public String display_name;
    public Object email;
    public String name;
    public String type;
}

public class AppDetailsModel {
    public String id;
    public String app_secret;
    public String description;
    public String display_name;
    public String name;
    public String os;
    public String platform;
    public String origin;
    public String icon_url;
    public Date created_at;
    public Date updated_at;
    public String release_type;
    public Owner owner;
    public Object azure_subscription;
    public ArrayList<String> member_permissions;
}