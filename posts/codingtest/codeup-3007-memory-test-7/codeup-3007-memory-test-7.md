---
title: '[자바]코드업 3007 기억력 테스트7'
date: 2020-03-06 09:00:00 +0900
path: 'codingtest/20200306codeup_3007_memory_test_7'
---

```java
import java.io.*;
import java.util.*;

public class Main {
	public static void main(String[] args) throws IOException{
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
		StringTokenizer st = new StringTokenizer(br.readLine());
		int n = Integer.parseInt(st.nextToken());
		int m = Integer.parseInt(st.nextToken());
		int [] sums = new int[n];
		int acc = 0;
		st = new StringTokenizer(br.readLine());
		for(int i = 0; i < n; i++) {
			acc += Integer.parseInt(st.nextToken());
			sums[i] = acc;
		}
		int [][] questions = new int[m][2];
		for(int i = 0; i < m; i++) {
			st = new StringTokenizer(br.readLine());
			questions[i][0] = Integer.parseInt(st.nextToken()) - 1;
			questions[i][1] = Integer.parseInt(st.nextToken()) - 1;
		}
		for(int i = 0; i < m; i++) {
			int answer = questions[i][0] == 0? sums[questions[i][1]] : sums[questions[i][1]] - sums[questions[i][0] - 1];
			bw.write(answer + "\n");
		}
		bw.flush();
	}
}
```
