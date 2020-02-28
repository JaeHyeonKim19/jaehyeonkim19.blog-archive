---
title: '백준 10250 ACM호텔'
date: 2020-01-12 08:26:28 -0400
path: 'codingtest/20200112boj_10250_acm_hotel'
---

반복문을 쓰면 시간초과가 되기 때문에 주의

```java
import java.util.*;

public class Main {

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		int caseNum = sc.nextInt();
		int h = 0;
		int w = 0;
		int n = 0;
		int a = 0;
		int b = 0;
		for(int i=0;i<caseNum;i++) {
			h = sc.nextInt();
			w = sc.nextInt();
			n = sc.nextInt();
			a = n % h;
			if(a == 0) a = h;
			b = n / h + 1;
			if(n % h == 0) b--;
			System.out.printf("%d%02d%n", a, b);
		}
	}
}
```
