---
title: '[자바] 프로그래머스 전화번호 목록'
date: 2020-02-06 08:26:28 -0400
path: 'codingtest/20200206programmers_phone_number_list'
---

```java
class Solution {
    public boolean solution(String[] phone_book) {
        boolean answer = true;
        for(int i = 0; i < phone_book.length - 1; i++){
            for(int j  = i + 1; j < phone_book.length; j++){
                if(phone_book[i].length() >= phone_book[j].length()){
                    if(phone_book[i].startsWith(phone_book[j])){
                        answer = false;
                        return answer;
                    } else {
                        continue;
                    }
                }else {
                    if(phone_book[j].startsWith(phone_book[i])){
                        answer = false;
                        return answer;
                    }else {
                        continue;
                    }
                }
            }
        }
        return answer;
    }
}
```
