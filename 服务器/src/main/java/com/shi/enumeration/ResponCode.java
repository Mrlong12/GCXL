package com.shi.enumeration;

public enum ResponCode {
    success(0),
    error(1010);

    private  int code;

    private ResponCode(int code){this.code = code;}

    public  int getCode(){return code;}

}
