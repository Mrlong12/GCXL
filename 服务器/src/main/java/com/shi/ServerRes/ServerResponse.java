package com.shi.ServerRes;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class ServerResponse<T> {
    //状态码
    private int code;
    //数据
    private T data;
    //信息
    private String errmsg;

    public ServerResponse() {
        super();
    }

    public ServerResponse(int status, String msg) {
        super();
        this.code = status;
        this.errmsg = msg;
    }

    public ServerResponse(int code, T data, String errmsg) {
        super();
        this.code = code;
        this.data = data;
        this.errmsg = errmsg;
    }
    public int getStatus() {
        return code;
    }
    public void setStatus(int code) {
        this.code = code;
    }
    public T getData() {
        return data;
    }
    public void setData(T data) {
        this.data = data;
    }
    public String getMsg() {
        return errmsg;
    }
    public void setMsg(String errmsg) {
        this.errmsg = errmsg;
    }


}