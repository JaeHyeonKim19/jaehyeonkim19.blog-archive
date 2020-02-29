---
title: '[자바]백준 1002 터렛'
date: 2020-01-24 08:26:28 -0400
path: 'codingtest/20200124boj_1002_turret'
---

- 결국 두 개의 원의 교점을 구하는 문제
  1. 중심이 일치하고 반지름이 같아 교점이 무한개인 경우
  2. 중심이 일치하고 반지름이 달라 교점이 없는 경우
  3. 외접하는 경우
  4. 중심간의 거리가 두 원의 반지름의 합보다 커 교점이 없는 경우
  5. 작은 원이 큰 원속에 있어 교점이 없는 경우(두 원의 반지름 차의 절대값이 중점간의 거리보다 큰 경우)
  6. 내접하는 경우

```java
import java.util.*;

public class Main {
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		int t = sc.nextInt();
		for(int i = 0;i < t;i++) {
			int x1 = sc.nextInt();
			int y1 = sc.nextInt();
			int r1 = sc.nextInt();
			int x2 = sc.nextInt();
			int y2 = sc.nextInt();
			int r2 = sc.nextInt();
			double distance = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
			if(x1 == x2 && y1 == y2 && r1 == r2) {
				System.out.println(-1);
			}else if(x1 == x2 && y1 == y2 && r1 != r2) {
				System.out.println(0);
			}else if(distance == r1 + r2) {
				System.out.println(1);
			}else if(distance > r1 + r2) {
				System.out.println(0);
			}else if(distance < Math.abs(r1 - r2)) {
				System.out.println(0);
			}else if(distance == Math.abs(r1 - r2)) {
				System.out.println(1);
			}else {
				System.out.println(2);
			}
		}
	}
}
```
