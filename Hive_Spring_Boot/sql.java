import org.springframework.web.bind.annotation.*;
import java.io.*;

@RestController
@RequestMapping("/api/backup")
public class BackupController {

    @PostMapping
    public String createBackup() {
        try {
            String backupCommand = "sqlcmd -S <SQL_SERVER_HOST> -U <USERNAME> -P <PASSWORD> -Q \"BACKUP DATABASE [<DATABASE_NAME>] TO DISK = 'C:\\backup\\<DATABASE_NAME>.bak'\"";
            Process process = Runtime.getRuntime().exec(backupCommand);
            process.waitFor();
            return "Backup created successfully!";
        } catch (Exception e) {
            return "Backup failed: " + e.getMessage();
        }
    }
}
