package com.osdoor.aircamp.audit;

import lombok.Getter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.time.LocalDateTime;

@Getter
@MappedSuperclass // 이 클래스를 다른 엔티티 클래스에서 상속받아 사용 할 수 있도록 함.
@EntityListeners(AuditingEntityListener.class) // 이 클래스에 대해서 엔티티가 생성되거나 수정될 때 해당 엔티티의 일부 필드를 자동으로 갱신할 수 있는 audit 리스너를 적용함.
public class Auditable {
    @CreatedDate // 엔티티가 생성될 때 자동으로 이 필드에 현재 시간이 설정되도록 함.
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt; // 생성된 시간

    @LastModifiedDate
    @Column(name = "modified_at")
    private LocalDateTime modifiedAt; // 마지막 수정된 시간

    @CreatedBy
    @Column(name = "created_by", updatable = false)
    private String createdBy; // 항목을 생성한 사용자나 시스템

    @LastModifiedBy
    @Column(name = "modified_by")
    private String modifiedBy; // 항목을 마지막으로 수정한 사용자나 시스템
}
