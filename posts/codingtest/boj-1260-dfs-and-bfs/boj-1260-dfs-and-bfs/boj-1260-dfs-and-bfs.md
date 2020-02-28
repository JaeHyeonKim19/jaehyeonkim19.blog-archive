---
title: '백준 1260 DFS와 BFS'
date: 2020-01-06 08:26:28 -0400
path: 'codingtest/20200106boj_1260_dfs_and_bfs'
---

```java
import java.util.*;

public class Main {
	static boolean [] isVisited;
	static int [][] nodesConnections;
	static Queue<Integer> bfsQueue = new LinkedList<Integer>();

	static void dfs(int currentNode) {
		System.out.print((currentNode+1) + " ");
		isVisited[currentNode] = true;
		for(int i = 0;i<nodesConnections.length;i++) {
			if(nodesConnections[currentNode][i]==1 && !isVisited[i]) {
				dfs(i);
			}
		}
	}

	static void bfs(int currentNode) {
		bfsQueue.offer(currentNode);
		isVisited[currentNode] = true;
		while(!bfsQueue.isEmpty()) {
			currentNode = bfsQueue.poll();
			System.out.print((currentNode+1) + " ");
			for(int i = 0;i<nodesConnections.length;i++) {
				if(nodesConnections[currentNode][i]==1 && !isVisited[i]) {
					bfsQueue.offer(i);
					isVisited[i] = true;
				}
			}
		}
	}

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		int nodesNum = sc.nextInt();
		int lineNum = sc.nextInt();
		int currentNode = sc.nextInt()-1;
		nodesConnections = new int[nodesNum][nodesNum];
		isVisited = new boolean[nodesNum];
		int from = 0;
		int to = 0;
		for(int i = 0;i<lineNum;i++) {
			from = sc.nextInt()-1;
			to = sc.nextInt()-1;
			nodesConnections[from][to] = 1;
			nodesConnections[to][from] = 1;
		}
		dfs(currentNode);
		System.out.println("");
		Arrays.fill(isVisited, false);
		bfs(currentNode);
	}

}
```
