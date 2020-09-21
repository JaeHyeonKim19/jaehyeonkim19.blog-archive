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

- R-Format Instructions
	- Read two register operands
	- Perform arithmetic/logical operation
	- Write register result

- Load/Store Instructions
	- Read register operands
	- Calculate address using 16-bit offset
		- Use ALU, but [sign-extend](https://en.wikipedia.org/wiki/Sign_extension) offset
	- Load: Read memory and update register
	- Store: Write register value to memory

- Branch Instructions
	- Read register operands
	- Compare operands
		- Use ALU, subtract and check Zero output
	- Calculate target address
		- Sign-extend displacement
		- Shift left 2 places (word displacement)
		- Add to PC + 4
			Already calculated by instruction fetch

- Full Datapath
	![full-datapath](./full-datapath.png)

### 4.4 A Simple Implement Scheme

- ALU Control
	- ALU used for
		- Load/Store: F = add
		- Branch: F = subtract
		- R-type: F depends on funct field
	|ALU control|Function|
	|---|---|
	|0000|AND|
	|0001|OR|
	|0010|add|
	|0110|substract|
	|0111|set-on-less-than|
	|1100|NOR|
	- Assume 2-bit ALUOp derived from opcode
		- Combinational logic derives ALU control
	![alu-control](./alu-control.png)

- The Main Control Unit
	- Control signals derived from instruction
	![the-main-control-unit](./the-main-control-unit.png)

- Datapath With Control
	![datapath-with-control](./datapath-with-control.png)

- Performance Issues
	- Longest delay determines clock period
		- Critical path: load instruction
		- Instruction memory -> register file -> ALU -> data memory -> register file
	- Not feasible to vary period for different instructions
	- Violates design principle
		- Making the common case fast
	- We will improve performance by pipelining

### 4.5 An Overview of Pipelining

- Pipelined laundry: overlapping execution
	- Parallelism improves performance

![piplelining-analogy](./pipelining-analogy.png)

- MIPS Pipeline
	- Five stages, one step per stage
		1. IF: Instruction fetch from memory
		2. ID: Instruction decode & register read
		3. EX: Execute operation or calculate address
		4. MEM: Access memory operand
		5. WB: Write result back to register

- Pipeline Performance
	- Assume time for stages is
		- 100ps for register read or write
		- 200ps for other stages
	- Compare pipelined datapath with single-cycle datapath

	![pipeline-performance](./pipeline-performance.png)

- Pipeline Performance
	![pipeline-performance-1](./pipeline-performance-1.png)

- Pipeline Speedup
	- If all stages are balanced
		- i.e., all take the same time
		- `Time between instructions(pipelined) = Time between instructions(nonpipelined) / Number of stages`
		- If not balanced, speedup is less
		- Speedup due to increased throughput
			- Latency (time for each instruction) does not decrease

- Pipelining and ISA Design
	- MIPS ISA designed for pipelining
		- All instructions are 32-bits
			- Easier to fetch and decode in one cycle
			- c.f. x86: 1 - to 17 byte instructions
		- Few and regular instruction formats
			- Can decode and read registers in one step
		- Load/store addressing
			- Can calculate address in 3nd stage, access memory in 4th stage
		- Alignment of memory operands
			- Memory access takes only one cycle