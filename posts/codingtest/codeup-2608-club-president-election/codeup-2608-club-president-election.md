---
title: '[자바]코드업 2608 동아리 회장 선거'
date: 2020-03-05 09:00:00 +0900
path: 'codingtest/20200305codeup_2608_club_president_election'
---

```java
import java.io.*;

public class Main {
	static BufferedWriter bw;
	static boolean [] visited;
	static void rec(int n, int count) throws IOException {
		if(count == n) {
			for(int i = 0; i < visited.length; i++) {
				if(visited[i]) {
					bw.write("O");
				}else {
					bw.write("X");
				}
			}
			bw.write("\n");
			return;
		}
		visited[count] = true;
		rec(n, count + 1);
		visited[count] = false;
		rec(n, count + 1);
	}

	public static void main(String[] args) throws IOException{
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		bw = new BufferedWriter(new OutputStreamWriter(System.out));
		int n = Integer.parseInt(br.readLine());
		visited = new boolean[n];
		rec(n, 0);
		bw.flush();
	}
}
```
