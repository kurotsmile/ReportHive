import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@Service
public class ExcelService {

    public List<List<String>> importExcel(MultipartFile file) throws Exception {
        List<List<String>> data = new ArrayList<>();

        // Kiểm tra loại file (XLS hoặc XLSX)
        String fileType = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf(".") + 1);
        InputStream inputStream = file.getInputStream();
        Workbook workbook;

        if ("xlsx".equalsIgnoreCase(fileType)) {
            workbook = new XSSFWorkbook(inputStream);
        } else if ("xls".equalsIgnoreCase(fileType)) {
            workbook = new HSSFWorkbook(inputStream);
        } else {
            throw new IllegalArgumentException("Invalid file type. Only XLS and XLSX are supported.");
        }

        // Đọc sheet đầu tiên
        Sheet sheet = workbook.getSheetAt(0);
        for (Row row : sheet) {
            List<String> rowData = new ArrayList<>();
            for (Cell cell : row) {
                rowData.add(getCellValueAsString(cell));
            }
            data.add(rowData);
        }

        workbook.close();
        return data;
    }

    private String getCellValueAsString(Cell cell) {
        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue();
            case NUMERIC:
                if (DateUtil.isCellDateFormatted(cell)) {
                    return cell.getDateCellValue().toString();
                } else {
                    return String.valueOf(cell.getNumericCellValue());
                }
            case BOOLEAN:
                return String.valueOf(cell.getBooleanCellValue());
            default:
                return "";
        }
    }
}
