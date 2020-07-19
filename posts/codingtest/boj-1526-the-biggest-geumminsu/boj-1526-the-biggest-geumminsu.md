---
title: '[자바]백준 1526 가장 큰 금민수'
date: 2020-07-19 09:00:00 +0900
path: 'codingtest/20200719boj_1526_the_biggest_geumminsu'
---

| 시간 제한 | 메모리 제한 | 제출 | 정답 | 맞은 사람 | 정답 비율 |
| --------- | ----------- | ---- | ---- | --------- | --------- |
| 2초       | 256MB       | 2881 | 1566 | 1333      | 57.656%   |

### 문제

은민이는 4와 7을 좋아하고, 나머지 숫자는 싫어한다. 금민수는 어떤 수가 4와 7로만 이루어진 수를 말한다.

N이 주어졌을 때, N보다 작거나 같은 금민수 중 가장 큰 것을 출력하는 프로그램을 작성하시오.

### 입력

첫째 줄에 N이 주어진다. N은 4보다 크거나 같고 1,000,000보다 작거나 같은 자연수이다.

### 출력

첫째 줄에 N보다 작거나 같은 금민수 중 가장 큰 것을 출력한다.

### 예제 입력1

```
100
```

### 예제 출력1

```
77
```

### 풀이

주어진 수부터 4까지 탐색하며 4와 7로 이루어져있는지 확인한다. 조건을 충족하면 해당 값을 출력하고 종료한다.

### 제출 코드

```java
import java.io.*;

public class Main {
    public static void main(String[] args) throws IOException{
    	// init
    	BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
    	BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
    	int n = Integer.parseInt(br.readLine());
    	// solve
    	for(int i = n; i >= 4; i--) {
    		String stringN = Integer.toString(i);
    		boolean isFourOrSeven = true;
    		for(int j = 0; j < stringN.length(); j++) {
    			if(!(stringN.charAt(j) == '4' || stringN.charAt(j) == '7')) {
    				isFourOrSeven = false;
    				break;
    			}
    		}
    		if(isFourOrSeven) {
    			bw.append(Integer.toString(i));
    			break;
    		} else {
    			continue;
    		}
    	}
    	// print
    	bw.flush();
    }
}
```
