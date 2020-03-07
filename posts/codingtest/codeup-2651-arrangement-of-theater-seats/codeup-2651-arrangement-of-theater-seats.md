---
title: '[자바]코드업 2651 극장 좌석 배치 1'
date: 2020-03-08 09:00:00 +0900
path: 'codingtest/20200308codeup_2651_arrangement_of_theater_seats'
---

```java
import java.io.*;
import java.util.*;

public class Main {

	static long fac(long curVal, long targetVal) {
		if(curVal == 1 || curVal == targetVal) return curVal == 1 ? 1 : targetVal;
		return curVal * fac(curVal - 1, targetVal);
	}

	public static void main(String[] args) throws IOException{
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine());
		long n = Integer.parseInt(st.nextToken());
		long m = Integer.parseInt(st.nextToken());
		System.out.print(fac(n, n - m + 1) / fac(m, 1));
	}
}
```
