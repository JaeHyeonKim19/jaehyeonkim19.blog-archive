---
title: '[컴퓨터구조론] 4. The Processor'
date: 2020-09-16 09:00:00 +0900
path: 'computerArchitecture/202009164-the-processor'
---

> 본 글은 영남대학교 최규상 교수님의 [컴퓨터 구조](http://www.kocw.net/home/cview.do?cid=184062fa9a833237) 강의를 듣고 작성된 글입니다.

### 4.1 Introduction

- CPU performance factors
	- Instruction count
		- Determined by ISA and compiler
	- CPI and Cycle time
		- Determined by CPU hardware

- We will examine two MIPS implementations
	- A simplified version
	- A more realistic pipelined version

- Instruction Execution
	- PC (program counter) -> instruction memory, fetch instruction
	- Register numbers -> register file, read registers
	- Depending on instruction class
		- Use ALU to calculate
			- Arithmetic result
			- Memory address for load/store
			- Branch target address
		- Access data memory for load/sotre
		- PC <- target address or PC + 4

- CPU Overview
	![cpu-overview](./cpu-overview.png)

### 4.2 Logic Design Conventions

- Loginc Design Basics
	- Information encoded in binary
		- Low voltage = 0, High voltage = 1
		- One wire per bit
		- Multi-bit data encoded on multi-wire buses
	- Combinational element
		- Operate on data
		- Output is a function of input
	- State (sequential) elements
		- Store information

- Clocking Methodology
	- Combinational logic transforms data during clcock cycles
		- Between clock edges
		- Input from state elements, output to state element
		- Longest delay determines clock period

### 4.3 Building a Datapath

- Building a Datapath
	- Datapath
		- Elements that process data and addresses in the CPU
			- Registers, ALUs, mux's, memories, ...
	- We will build a MIPS datapath incrementally
		- Refining the overview design

- Full Datapath
	![full-datapath](./full-datapath.png)

	