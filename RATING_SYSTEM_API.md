# Rating System - API Documentation

## Overview
A comprehensive 5-star rating system for materials/products with support for reviews, statistics, and top-rated products.

## Features
✅ Rate materials (1-5 stars)
✅ Add optional review comments
✅ Update existing ratings
✅ Get average ratings and statistics
✅ View rating distribution (1-5 star breakdown)
✅ Get user's rating history
✅ Delete ratings
✅ Get top-rated materials
✅ Automatic rating cache updates

## Database Schema

### Rating Model
```prisma
model Rating {
  id         String   @id @default(uuid())
  userId     String
  materialId String
  value      Int      // 1 to 5
  comment    String?  // Optional review comment
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  user     User     @relation(fields: [userId], references: [id])
  material Material @relation(fields: [materialId], references: [id])

  @@unique([userId, materialId]) // one rating per user per product
}
```

### Material Model Updates
```prisma
model Material {
  // ... existing fields
  averageRating Float?    @default(0) // Cached average rating
  ratingCount   Int       @default(0) // Total number of ratings
  ratings       Rating[]  // All ratings for this material
}
```

## API Endpoints

### 1. Rate a Material
**POST** `/api/rating/:materialId`

**Authentication:** Required (JWT)

**Body:**
```json
{
  "value": 5,
  "comment": "Excellent product! Highly recommended." // optional
}
```

**Response:**
```json
{
  "id": "uuid",
  "userId": "user-uuid",
  "materialId": "material-uuid",
  "value": 5,
  "comment": "Excellent product! Highly recommended.",
  "createdAt": "2026-02-16T20:00:00.000Z",
  "updatedAt": "2026-02-16T20:00:00.000Z",
  "user": {
    "id": "user-uuid",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Notes:**
- If user already rated this material, the rating will be updated
- Automatically updates material's averageRating and ratingCount

---

### 2. Get All Ratings for a Material
**GET** `/api/rating/material/:materialId`

**Authentication:** Not required

**Response:**
```json
[
  {
    "id": "uuid",
    "userId": "user-uuid",
    "materialId": "material-uuid",
    "value": 5,
    "comment": "Great product!",
    "createdAt": "2026-02-16T20:00:00.000Z",
    "user": {
      "id": "user-uuid",
      "name": "Jane Doe",
      "email": "jane@example.com"
    }
  }
]
```

---

### 3. Get Rating Statistics for a Material
**GET** `/api/rating/material/:materialId/stats`

**Authentication:** Not required

**Response:**
```json
{
  "averageRating": 4.5,
  "totalRatings": 10,
  "distribution": {
    "1": 0,
    "2": 1,
    "3": 2,
    "4": 3,
    "5": 4
  }
}
```

**Notes:**
- `distribution` shows count of each star rating (1-5)
- `averageRating` is calculated from all ratings
- `totalRatings` is the total number of ratings

---

### 4. Get Current User's Rating for a Material
**GET** `/api/rating/my/:materialId`

**Authentication:** Required (JWT)

**Response:**
```json
{
  "id": "uuid",
  "userId": "user-uuid",
  "materialId": "material-uuid",
  "value": 5,
  "comment": "Love it!",
  "createdAt": "2026-02-16T20:00:00.000Z",
  "user": {
    "id": "user-uuid",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Notes:**
- Returns `null` if user hasn't rated this material yet

---

### 5. Get All Ratings by Current User
**GET** `/api/rating/my`

**Authentication:** Required (JWT)

**Response:**
```json
[
  {
    "id": "uuid",
    "userId": "user-uuid",
    "materialId": "material-uuid",
    "value": 4,
    "comment": "Good quality",
    "createdAt": "2026-02-16T20:00:00.000Z",
    "material": {
      "id": "material-uuid",
      "title": "Premium Watch",
      "imageUrl": "https://example.com/image.jpg",
      "price": 299.99
    }
  }
]
```

---

### 6. Delete Current User's Rating
**DELETE** `/api/rating/:materialId`

**Authentication:** Required (JWT)

**Response:**
```json
{
  "message": "Rating deleted successfully"
}
```

**Notes:**
- Only the user who created the rating can delete it
- Automatically updates material's averageRating and ratingCount

---

### 7. Get Top Rated Materials
**GET** `/api/rating/top?limit=10`

**Authentication:** Not required

**Query Parameters:**
- `limit` (optional): Number of materials to return (default: 10)

**Response:**
```json
[
  {
    "id": "material-uuid",
    "title": "Premium Watch",
    "description": "Luxury gold watch",
    "imageUrl": "https://example.com/image.jpg",
    "price": 299.99,
    "categoryId": "category-uuid",
    "averageRating": 4.8,
    "ratingCount": 25,
    "category": {
      "id": "category-uuid",
      "name": "Watches"
    },
    "ratings": [
      {
        "id": "rating-uuid",
        "value": 5,
        "comment": "Amazing!",
        "createdAt": "2026-02-16T20:00:00.000Z",
        "user": {
          "name": "John Doe"
        }
      }
    ]
  }
]
```

**Notes:**
- Only includes materials with at least one rating
- Sorted by averageRating (highest first)
- Includes up to 3 recent ratings per material

---

## Usage Examples

### Frontend Integration

#### Display Star Rating
```typescript
// Product component
const ProductRating = ({ materialId }) => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/rating/material/${materialId}/stats`)
      .then(res => res.json())
      .then(data => setStats(data));
  }, [materialId]);

  if (!stats) return <div>Loading...</div>;

  return (
    <div>
      <div>⭐ {stats.averageRating.toFixed(1)} / 5</div>
      <div>{stats.totalRatings} reviews</div>
    </div>
  );
};
```

#### Submit Rating
```typescript
const submitRating = async (materialId, value, comment) => {
  const token = localStorage.getItem('token');
  
  const response = await fetch(`http://localhost:5000/api/rating/${materialId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ value, comment }),
  });

  return response.json();
};
```

#### Check User's Rating
```typescript
const getUserRating = async (materialId) => {
  const token = localStorage.getItem('token');
  
  const response = await fetch(`http://localhost:5000/api/rating/my/${materialId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  return response.json(); // null if not rated yet
};
```

---

## Validation Rules

### Rating Value
- **Required:** Yes
- **Type:** Integer
- **Min:** 1
- **Max:** 5

### Comment
- **Required:** No
- **Type:** String
- **Max Length:** No limit (can be added via DTO)

---

## Error Responses

### 400 Bad Request
```json
{
  "statusCode": 400,
  "message": "Rating must be between 1 and 5",
  "error": "Bad Request"
}
```

### 401 Unauthorized
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

### 404 Not Found
```json
{
  "statusCode": 404,
  "message": "Material not found",
  "error": "Not Found"
}
```

---

## Performance Optimizations

### 1. Cached Average Rating
- Material's `averageRating` and `ratingCount` are cached in the database
- Updated automatically when ratings are created, updated, or deleted
- Reduces need for expensive aggregation queries

### 2. Efficient Queries
- Uses Prisma's `aggregate` for statistics
- Includes only necessary fields in responses
- Proper indexing on `userId_materialId` composite key

---

## Testing with Postman/cURL

### Rate a Product
```bash
curl -X POST http://localhost:5000/api/rating/MATERIAL_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "value": 5,
    "comment": "Excellent product!"
  }'
```

### Get Product Stats
```bash
curl http://localhost:5000/api/rating/material/MATERIAL_ID/stats
```

### Get Top Rated Products
```bash
curl http://localhost:5000/api/rating/top?limit=5
```

---

## Future Enhancements (Optional)

1. **Helpful Votes:** Users can mark reviews as helpful
2. **Image Uploads:** Allow users to upload images with reviews
3. **Verified Purchase:** Show badge for verified buyers
4. **Report Reviews:** Flag inappropriate reviews
5. **Admin Moderation:** Approve/reject reviews
6. **Sorting Options:** Sort reviews by date, rating, helpful votes
7. **Pagination:** For materials with many reviews

---

## Migration Steps

If you're adding this to an existing database:

```bash
# 1. Update schema (already done)

# 2. Generate Prisma client
npx prisma generate

# 3. Push to database
npx prisma db push

# 4. Restart your NestJS server
```

---

**Status:** ✅ Fully Implemented
**Version:** 1.0.0
**Last Updated:** 2026-02-16
