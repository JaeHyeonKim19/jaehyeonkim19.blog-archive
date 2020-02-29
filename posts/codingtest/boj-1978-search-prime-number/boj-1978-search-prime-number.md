---
title: '[자바]백준 1978 소수 찾기'
date: 2020-01-15 08:26:28 -0400
path: 'codingtest/20200115boj_1978_search_prime_number'
---

```java
import java.util.*;

public class Main {
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		int n = sc.nextInt();
		int count = 0;
		for(int i = 0;i<n;i++) {
			int val = sc.nextInt();
			double sqrt = Math.sqrt(val);
			int j = 2;
			for(;j<=sqrt;j++) {
				if(val%j==0) {
					break;
				}
			}
			if(j>sqrt && val != 1)count++;
		}
		System.out.print(count);
	}
}
```
