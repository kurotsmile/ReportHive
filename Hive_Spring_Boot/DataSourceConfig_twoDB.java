import org.springframework.beans.factory.annotation.*;
import org.springframework.boot.autoconfigure.jdbc.*;
import org.springframework.context.annotation.*;
import org.springframework.jdbc.datasource.lookup.*;

import javax.sql.DataSource;
import java.util.*;

@Configuration
public class DataSourceConfig {

    @Bean
    public DataSource dataSource(
        @Qualifier("primaryDataSourceProperties") DataSourceProperties primaryProperties,
        @Qualifier("backupDataSourceProperties") DataSourceProperties backupProperties
    ) {
        Map<Object, Object> dataSources = new HashMap<>();
        dataSources.put("primary", primaryProperties.initializeDataSourceBuilder().build());
        dataSources.put("backup", backupProperties.initializeDataSourceBuilder().build());

        RoutingDataSource routingDataSource = new RoutingDataSource();
        routingDataSource.setTargetDataSources(dataSources);
        routingDataSource.setDefaultTargetDataSource(dataSources.get("primary"));
        return routingDataSource;
    }

    @Bean(name = "primaryDataSourceProperties")
    @ConfigurationProperties(prefix = "spring.datasource.primary")
    public DataSourceProperties primaryDataSourceProperties() {
        return new DataSourceProperties();
    }

    @Bean(name = "backupDataSourceProperties")
    @ConfigurationProperties(prefix = "spring.datasource.backup")
    public DataSourceProperties backupDataSourceProperties() {
        return new DataSourceProperties();
    }
}
