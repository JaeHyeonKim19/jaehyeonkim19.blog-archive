---
title: '[자바]백준 10814 나이순 정렬'
date: 2020-07-18 09:00:00 +0900
path: 'codingtest/20200718boj_10814_order_by_age'
---

| 시간 제한 | 메모리 제한 | 제출  | 정답  | 맞은 사람 | 정답 비율 |
| --------- | ----------- | ----- | ----- | --------- | --------- |
| 3초       | 256MB       | 26942 | 11049 | 8424      | 41.079%   |

### 문제

온라인 저지에 가입한 사람들의 나이와 이름이 가입한 순서대로 주어진다. 이때, 회원들을 나이가 증가하는 순으로, 나이가 같으면 먼저 가입한 사람이 앞에 오는 순서로 정렬하는 프로그램을 작성하시오.

### 입력

첫째 줄에 온라인 저지 회원의 수 N이 주어진다. (1 ≤ N ≤ 100,000)

둘째 줄부터 N개의 줄에는 각 회원의 나이와 이름이 공백으로 구분되어 주어진다. 나이는 1보다 크거나 같으며, 200보다 작거나 같은 정수이고, 이름은 알파벳 대소문자로 이루어져 있고, 길이가 100보다 작거나 같은 문자열이다. 입력은 가입한 순서로 주어진다.

### 출력

첫째 줄부터 총 N개의 줄에 걸쳐 온라인 저지 회원을 나이 순, 나이가 같으면 가입한 순으로 한 줄에 한 명씩 나이와 이름을 공백으로 구분해 출력한다.

### 예제 입력1

```
3
21 Junkyu
21 Dohyun
20 Sunyoung
```

### 예제 출력1

```
20 Sunyoung
21 Junkyu
21 Dohyun
```

### 풀이

나이순으로 정렬하되 나이가 같을 경우에는 가입순서대로 정렬하는 문제이다. 입력이 가입순서대로 주어지므로 stable sort(안정 정렬)을 통해서 정렬하면 된다. 자바로 풀 경우 Comparator를 정의할 때 나이 같을 경우 0을 리턴하도록 하면 안정 정렬이 이루어 진다.

### 제출 코드

```java
import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws IOException{
    	// init
    	BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
    	int n = Integer.parseInt(br.readLine());
    	User[] users = new User[n];
    	StringTokenizer st;
    	for(int i = 0; i < n; i++) {
    		st = new StringTokenizer(br.readLine());
    		int age = Integer.parseInt(st.nextToken());
    		String name = st.nextToken();
    		users[i] = new User(age, name);
    	}

    	// sort
    	Arrays.sort(users, new UserComparator());

    	// print
    	BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
    	for(int i = 0; i < users.length; i++) {
    		bw.append(users[i].getAge() + " " + users[i].getName() + "\n");
    	}
    	bw.flush();
    }
}

class User {
	private int age;
	private String name;

	User(int age, String name) {
		this.age = age;
		this.name = name;
	}

	public int getAge() {
		return this.age;
	}

	public String getName() {
		return this.name;
	}
}

class UserComparator implements Comparator<User> {
	@Override
	public int compare(User user1, User user2) {
		if(user1.getAge() > user2.getAge()) {
			return 1;
		}else if(user1.getAge() < user2.getAge()) {
			return -1;
		}else {
			return 0;
		}
	}
}
```
