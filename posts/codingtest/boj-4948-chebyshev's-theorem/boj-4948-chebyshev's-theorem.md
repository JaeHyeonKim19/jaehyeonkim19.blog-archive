---
title: '[자바]백준 4948 베르트랑 공준'
date: 2020-01-18 08:26:28 -0400
path: 'codingtest/20200118boj_4948_chebyshevs-theorem'
---

```java
import java.util.*;

public class Main {
	static boolean isPrime(int num) {
		if (num == 1) return false;
		for(int i = 2;i<=Math.sqrt(num);i++) {
			if (num % i == 0) return false;
		}
		return true;
	}
	static int getChebyshev(int num) {
		int count = 0;
		for(int i = num+1;i<=2*num;i++) {
			if(isPrime(i)) count++;
		}
		return count;
	}
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		int n = sc.nextInt();
		while(n != 0) {
			System.out.println(getChebyshev(n));
			n = sc.nextInt();
		}
	}
}
```
