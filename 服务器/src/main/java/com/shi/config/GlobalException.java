package com.shi.config;
import com.shi.ServerRes.ServerResponse;
import com.shi.enumeration.ResponCode;
import com.shi.exception.FriendException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

@ControllerAdvice
public class GlobalException {
    @ResponseBody
    @ExceptionHandler(FriendException.class)
    public ServerResponse GlobalException(Exception e){
        //a = new ServerResponse(ResponCode.error.getCode(),e.getMessage());
        return new ServerResponse(ResponCode.error.getCode(),e.getMessage());
    }

}
