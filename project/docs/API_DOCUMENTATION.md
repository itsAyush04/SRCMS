# API Documentation

## 🔌 REST API Endpoints

### Authentication Endpoints

#### `POST /api/auth/login/`
**Purpose**: User authentication and JWT token generation
**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```
**Response**:
```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "role": "citizen",
    "name": "John Doe"
  }
}
```

#### `POST /api/auth/refresh/`
**Purpose**: Refresh expired access tokens
**Request Body**:
```json
{
  "refresh_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

### Complaint Management Endpoints

#### `POST /api/complaints/`
**Purpose**: Submit new complaint with AI processing
**Request Body**:
```json
{
  "personal_info": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+91-9876543210",
    "pnr": "PNR1234567"
  },
  "journey_details": {
    "train_number": "12345",
    "station": "New Delhi",
    "date": "2024-01-15"
  },
  "complaint_details": {
    "category": "Train Delay/Cancellation",
    "subject": "Train delayed by 3 hours",
    "description": "The train was significantly delayed causing inconvenience...",
    "priority": "high"
  },
  "attachments": [
    {
      "file_name": "evidence.jpg",
      "file_type": "image/jpeg",
      "file_data": "base64_encoded_data"
    }
  ]
}
```

**Response**:
```json
{
  "token_id": "RWY-2024-001234",
  "status": "submitted",
  "ai_analysis": {
    "predicted_category": "Train Delay/Cancellation",
    "sentiment_score": -0.7,
    "priority_score": 85,
    "urgency_level": "high"
  },
  "estimated_resolution": "2024-01-18T16:00:00Z",
  "assigned_officer": null,
  "created_at": "2024-01-15T10:30:00Z"
}
```

#### `GET /api/complaints/{token_id}/`
**Purpose**: Retrieve complaint details and status
**Response**:
```json
{
  "token_id": "RWY-2024-001234",
  "status": "in_progress",
  "complaint_details": {
    "subject": "Train delayed by 3 hours",
    "category": "Train Delay/Cancellation",
    "description": "Detailed complaint description...",
    "priority": "high"
  },
  "ai_analysis": {
    "sentiment_score": -0.7,
    "priority_score": 85,
    "confidence_level": 0.92
  },
  "timeline": [
    {
      "timestamp": "2024-01-15T10:30:00Z",
      "status": "submitted",
      "message": "Complaint received and assigned token ID",
      "officer": "System"
    },
    {
      "timestamp": "2024-01-15T11:15:00Z",
      "status": "categorized",
      "message": "AI categorization completed",
      "officer": "AI System"
    }
  ],
  "assigned_officer": {
    "name": "John Smith",
    "designation": "Railway Officer",
    "contact": "officer@railway.gov.in"
  }
}
```

#### `PUT /api/complaints/{token_id}/`
**Purpose**: Update complaint status (Personnel only)
**Request Body**:
```json
{
  "status": "in_progress",
  "resolution_notes": "Investigation started. Contacting station manager.",
  "estimated_resolution": "2024-01-18T16:00:00Z"
}
```

### AI Processing Endpoints

#### `POST /api/ai/analyze-sentiment/`
**Purpose**: Analyze text sentiment for complaint prioritization
**Request Body**:
```json
{
  "text": "I am extremely disappointed with the service quality...",
  "language": "en"
}
```
**Response**:
```json
{
  "sentiment_score": -0.8,
  "sentiment_label": "negative",
  "confidence": 0.94,
  "emotion_breakdown": {
    "anger": 0.6,
    "disappointment": 0.3,
    "frustration": 0.1
  }
}
```

#### `POST /api/ai/categorize/`
**Purpose**: Automatically categorize complaint content
**Request Body**:
```json
{
  "text": "The train was delayed and the coach was dirty...",
  "metadata": {
    "train_number": "12345",
    "station": "New Delhi"
  }
}
```
**Response**:
```json
{
  "predicted_category": "Train Delay/Cancellation",
  "confidence": 0.89,
  "alternative_categories": [
    {
      "category": "Cleanliness Issues",
      "confidence": 0.76
    }
  ]
}
```

### Analytics Endpoints

#### `GET /api/analytics/dashboard/`
**Purpose**: Retrieve dashboard statistics and KPIs
**Query Parameters**:
- `date_from`: Start date (YYYY-MM-DD)
- `date_to`: End date (YYYY-MM-DD)
- `category`: Filter by complaint category
- `priority`: Filter by priority level

**Response**:
```json
{
  "summary_stats": {
    "total_complaints": 1247,
    "pending_resolution": 89,
    "resolved_today": 34,
    "avg_resolution_time": "2.3 days"
  },
  "category_breakdown": [
    {
      "category": "Train Delays",
      "count": 67,
      "percentage": 35.2
    }
  ],
  "priority_distribution": {
    "urgent": 23,
    "high": 45,
    "medium": 78,
    "low": 34
  },
  "resolution_trends": [
    {
      "date": "2024-01-15",
      "resolved": 12,
      "submitted": 18
    }
  ]
}
```

#### `GET /api/analytics/trends/`
**Purpose**: Historical trend analysis and patterns
**Response**:
```json
{
  "complaint_trends": {
    "daily_average": 42.3,
    "weekly_growth": 12.5,
    "peak_hours": ["08:00-10:00", "18:00-20:00"],
    "seasonal_patterns": {
      "summer": 1.3,
      "monsoon": 1.8,
      "winter": 0.9
    }
  },
  "resolution_efficiency": {
    "avg_resolution_time": "2.3 days",
    "improvement_rate": 15.2,
    "officer_performance": [
      {
        "officer_id": 1,
        "name": "John Smith",
        "avg_resolution_time": "1.8 days",
        "satisfaction_rating": 4.6
      }
    ]
  }
}
```

### File Upload Endpoints

#### `POST /api/files/upload/`
**Purpose**: Handle multimodal file uploads
**Request**: Multipart form data
**Response**:
```json
{
  "file_id": "file_123456",
  "file_name": "evidence.jpg",
  "file_size": 2048576,
  "file_type": "image/jpeg",
  "upload_url": "https://storage.railway.gov.in/files/file_123456.jpg",
  "ai_analysis": {
    "content_type": "document",
    "text_extracted": "Train number 12345 delayed...",
    "quality_score": 0.92
  }
}
```

## 🔒 Authentication & Authorization

### JWT Token Structure
```json
{
  "header": {
    "alg": "HS256",
    "typ": "JWT"
  },
  "payload": {
    "user_id": 1,
    "email": "user@example.com",
    "role": "citizen",
    "exp": 1642694400,
    "iat": 1642608000
  }
}
```

### Role-Based Access Control

#### Citizen Role
- Submit complaints
- Track own complaints
- Upload supporting documents
- Receive notifications

#### Personnel Role
- View all complaints
- Update complaint status
- Access analytics dashboard
- Assign complaints to officers

#### Admin Role
- Full system access
- User management
- System configuration
- Advanced analytics

### API Rate Limiting
- **Citizens**: 100 requests/hour
- **Personnel**: 1000 requests/hour
- **Admin**: Unlimited
- **File Uploads**: 10 files/hour per user

## 📊 Response Codes

### Success Codes
- `200 OK`: Request successful
- `201 Created`: Resource created successfully
- `202 Accepted`: Request accepted for processing
- `204 No Content`: Successful deletion

### Client Error Codes
- `400 Bad Request`: Invalid request data
- `401 Unauthorized`: Authentication required
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `422 Unprocessable Entity`: Validation errors
- `429 Too Many Requests`: Rate limit exceeded

### Server Error Codes
- `500 Internal Server Error`: Server error
- `502 Bad Gateway`: Upstream service error
- `503 Service Unavailable`: Service temporarily unavailable

## 🔧 Error Response Format
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ],
    "timestamp": "2024-01-15T10:30:00Z",
    "request_id": "req_123456"
  }
}
```

## 📈 Performance Specifications

### Response Time Targets
- **Authentication**: < 100ms
- **Complaint Submission**: < 500ms
- **Status Tracking**: < 200ms
- **Dashboard Analytics**: < 1000ms
- **File Upload**: < 2000ms (per MB)

### Throughput Capacity
- **Concurrent Users**: 1000+
- **Requests per Second**: 500+
- **File Upload Bandwidth**: 100 MB/s
- **Database Queries**: 10,000/minute

This API documentation provides comprehensive guidance for integrating with the Railway Complaint Management System's backend services.