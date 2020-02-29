---
title: '[자바]백준 3053 택시 기하학'
date: 2020-01-23 08:26:28 -0400
path: 'codingtest/20200123boj_3053_taxicab_geometry'
---

- 유클리드 기하학 원 넓이 : `Math.PI * Math.pow(r, 2)`
- 택시 기하학 원 넓이 : `2 * Math.pow(r, 2)`
  - 택시 기하학에서 반지름이 r인 원은 한 변의 길이가 r인 직각마름모와 동일하다. 마름모의 넓이는 두 대각선의 곱이고 지각 마름모의 대각선의 길이는 `Math.sqrt(2) * r`이므로 택시 기하학에서 원의 넓이는 `2 * Math.pow(r, 2)`이다.

```java
import java.util.*;

public class Main {
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		int r = sc.nextInt();
		System.out.println(Math.PI * Math.pow(r, 2));
		System.out.println(2 * Math.pow(r, 2));
	}
}
```
