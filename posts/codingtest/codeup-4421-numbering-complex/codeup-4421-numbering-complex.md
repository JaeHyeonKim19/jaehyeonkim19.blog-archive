---
title: '[자바]코드업 4421 단지 번호 붙이기'
date: 2020-03-08 09:00:00 +0900
path: 'codingtest/20200308codeup_4421_numbering_complex'
---

```java
import java.io.*;
import java.util.*;

public class Main {
	static ArrayList<Integer> complex;
	static int count;
	static int n;
	static int [][] buildings;
	static int [][] coordinate = {{1, -2, 1, 0}, {0, 0, 1, -2}};

	static void rec(int x, int y, boolean isStart) {
		count++;
		buildings[x][y] = complex.size() + 2;
		int nextX = x;
		int nextY = y;
		for(int i = 0; i < 4; i++) {
			nextX += coordinate[0][i];
			nextY += coordinate[1][i];
			if(nextX < 0 || nextY < 0 || nextX >= n || nextY >= n) continue;
			if(buildings[nextX][nextY] == 1) rec(nextX, nextY, false);
		}

		if(isStart) {
			complex.add(count);
			count = 0;
		}
	}

	public static void main(String[] args) throws IOException{
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
		complex = new ArrayList<Integer>();
		count = 0;
		n = Integer.parseInt(br.readLine());
		buildings = new int [n][n];
		String line = "";
		for(int i = 0; i < n; i++) {
			line = br.readLine();
			for(int j = 0; j < n; j++) {
				buildings[i][j] = line.charAt(j) - 48;
			}
		}
		for(int i = 0; i < n; i++) {
			for(int j = 0; j < n; j++) {
				if(buildings[i][j] == 1) rec(i, j, true);
			}
		}
		Collections.sort(complex);
		bw.write(complex.size() + "\n");
		for(int i = 0; i < complex.size(); i++) {
			bw.write(complex.get(i) + "\n");
		}
		bw.flush();
	}
}
```
