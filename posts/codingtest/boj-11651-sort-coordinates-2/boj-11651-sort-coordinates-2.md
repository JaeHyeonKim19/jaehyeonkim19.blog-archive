---
title: '[자바]백준 11651 좌표 정렬하기 2'
date: 2020-04-01 09:00:00 +0900
path: 'codingtest/20200401boj_11651_sort_coordinates_2'
---

```java
import java.io.*;
import java.util.*;

public class Main {
	public static void main(String[] args) throws IOException{
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
		int n = Integer.parseInt(br.readLine());
		int[][] coordinates = new int[n][2];
		StringTokenizer st = new StringTokenizer("");
		for(int i = 0; i < n; i++) {
			st = new StringTokenizer(br.readLine());
			coordinates[i][0] = Integer.parseInt(st.nextToken());
			coordinates[i][1] = Integer.parseInt(st.nextToken());
		}
		Arrays.sort(coordinates, new Comparator<int[]>() {
			@Override
			public int compare(int[] coordinate1, int[] coordinate2) {
				if(coordinate1[1] > coordinate2[1]) {
					return 1;
				}else if(coordinate1[1] == coordinate2[1] && coordinate1[0] > coordinate2[0]) {
					return 1;
				}else if(coordinate1[0] == coordinate2[0] && coordinate1[1] == coordinate2[1]) {
					return 0;
				}else {
					return -1;
				}
			}
		});
		for(int i = 0; i < n; i++) {
			bw.write(coordinates[i][0] + " " + coordinates[i][1] + "\n");
		}
		bw.flush();
	}
}
```
