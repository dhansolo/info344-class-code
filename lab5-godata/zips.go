package main

import (
	"os"
	"log"
	"encoding/csv"
	"fmt"
	"io"
)

type RecordStats struct {
	TotalRecords int
	NumberOfType map[string]int
	ZipCode int
}

func main() {
	file, err := os.Open("./zip_code_database.csv")
	if err != nil {
		log.Fatal(err)	
	}
	Total := 0
	TotalType := make(map[string]int)
	r := csv.NewReader(file)
	for {
		record, err := r.Read()
		if err == io.EOF {
			break
		}
		if err != nil {
			log.Fatal(err)
		}
		Total++
		TotalType[record[1]]++
	}
	stats := RecordStats {
		TotalRecords: Total,
		NumberOfType: TotalType,
	}
	fmt.Println(stats)
	file.Close()
}