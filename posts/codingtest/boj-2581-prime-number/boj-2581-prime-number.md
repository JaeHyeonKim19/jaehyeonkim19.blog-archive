---
title: '[자바]백준 2581 소수'
date: 2020-01-16 08:26:28 -0400
path: 'codingtest/20200116boj_2581_prime_number'
---

```java
import java.util.*;

public class Main {
	static boolean isPrime(int num) {
		if(num == 1) return false;
		for(int i = 2;i<=Math.sqrt(num);i++) {
			if(num%i == 0) return false;
		}
		return true;
	}
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		int m = sc.nextInt();
		int n = sc.nextInt();
		int min = 0;
		int sum = 0;
		boolean isFirst = true;
		for(int i = m;i<=n;i++) {
			boolean isPrime = isPrime(i);
			if(isFirst && isPrime) {
				min = i;
				isFirst = false;
			}
			if(isPrime) sum += i;
		}
		if(isFirst) {
			System.out.print(-1);
		}else {
			System.out.println(sum);
			System.out.print(min);
		}
	}
}
```
