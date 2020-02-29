---
title: '[자바]백준 1929 소수 구하기'
date: 2020-01-17 08:26:28 -0400
path: 'codingtest/20200117boj_1929_get_prime_num'
---

```java
import java.util.*;

public class Main {
	static boolean isPrime(int num) {
		if(num == 1) return false;
		for(int i = 2;i<=Math.sqrt(num);i++) {
			if(num%i==0) return false;
		}
		return true;
	}
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		int m = sc.nextInt();
		int n = sc.nextInt();
		for(int i = m;i<=n;i++) {
			if(isPrime(i)) System.out.println(i);
		}
	}
}
```
