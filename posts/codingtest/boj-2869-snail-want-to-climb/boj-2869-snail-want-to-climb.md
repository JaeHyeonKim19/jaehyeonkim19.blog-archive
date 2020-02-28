---
title: '백준 2869 달팽이는올라가고싶다'
date: 2020-01-12 08:26:28 -0400
path: 'codingtest/20200112boj_2869_snail_want_to_climb'
---

반복문을 쓰면 시간초과가 되기 때문에 주의

```java
import java.util.*;

public class Main {

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		int a = sc.nextInt();
		int b = sc.nextInt();
		int v = sc.nextInt();
		int answer = (v-b)/(a-b);
		if((v-b)%(a-b)>0) answer++;
		System.out.print(answer);
	}
}
```
