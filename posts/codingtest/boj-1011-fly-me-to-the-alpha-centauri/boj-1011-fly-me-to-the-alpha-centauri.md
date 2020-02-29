---
title: '[자바]백준 1011 Fly me to the Alpha Centauri'
date: 2020-01-14 08:26:28 -0400
path: 'codingtest/20200114boj_1011_fly_me_to_the_alpha_centauri'
---

주어지는 값들은 int의 범위를 넘어서지 않지만 계산과정에서 int범위를 벗어남으로 long을 사용해야 함에 유의.

```java
import java.util.*;

public class Main {
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		long num = sc.nextInt();
		for(int i = 0;i<num;i++) {
			long count = 1;
			long countMaxDistance = 0;
			long x = sc.nextInt();
			long y = sc.nextInt();
			long distance = y - x;
			while(distance>countMaxDistance) {
				count++;
				countMaxDistance += count/2;
			}
			System.out.println(count-1);
		}
	}
}
```
