package com.phil.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Agent {

    @Id
    @Column
    String name;

    @Column
    String latitude;

    @Column
    String longitude;

    @Column
    Integer age;

    @Column
    String sex;

    protected Agent() {
    }

    public Agent(String name, String latitude, String longitude, Integer age, String sex) {
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.age = age;
        this.sex = sex;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLongitude() {
        return longitude;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }

    public String getLatitude() {
        return latitude;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }
}
