package co.edu.ucentral.eventos;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {
        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("co.edu.ucentral.eventos");

        noClasses()
            .that()
            .resideInAnyPackage("co.edu.ucentral.eventos.service..")
            .or()
            .resideInAnyPackage("co.edu.ucentral.eventos.repository..")
            .should()
            .dependOnClassesThat()
            .resideInAnyPackage("..co.edu.ucentral.eventos.web..")
            .because("Services and repositories should not depend on web layer")
            .check(importedClasses);
    }
}
