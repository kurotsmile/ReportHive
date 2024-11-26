
@GetMapping("/api/reports/summary")
public ResponseEntity<?> getReportSummary(
        @RequestParam String period, // "week" hoặc "month"
        @RequestParam(required = false) String filter // Tùy chọn lọc sản phẩm
) {
    // Logic xử lý dữ liệu từ DB
    // Trả về: Total Revenue, Build Quantity, Mass Production Headcount, NPI Headcount
    return ResponseEntity.ok(reportSummaryService.getSummary(period, filter));
}


@GetMapping("/api/reports/trend")
public ResponseEntity<?> getTrendChart(
        @RequestParam String period,
        @RequestParam(required = false) String filter
) {
    // Trả về dữ liệu doanh thu và số lượng build theo product family
    return ResponseEntity.ok(reportTrendService.getTrend(period, filter));
}

@GetMapping("/api/reports/utilization")
public ResponseEntity<?> getUtilization(
        @RequestParam String period
) {
    // Trả về dữ liệu: số lượng line/tester có sẵn, cần thiết, và Headcount
    return ResponseEntity.ok(utilizationService.getUtilization(period));
}


@GetMapping("/api/reports/utilization")
public ResponseEntity<?> getUtilization(
        @RequestParam String period
) {
    // Trả về dữ liệu: số lượng line/tester có sẵn, cần thiết, và Headcount
    return ResponseEntity.ok(utilizationService.getUtilization(period));
}

