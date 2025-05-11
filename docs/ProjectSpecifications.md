# ID Chips Project Specification

IMPORTANT: Always apply the following guidelines when generating code:
- Always check code on githhub https://github.com/mparthoens/idc-sourcegraph branch develop before generating code.
- Before each code block generation, display full file path of the file for wich code is generated
- Pause between each file code generation. Wait for instruction to continue.
- Give me a few lines of overlaps when you generate code.
- Comments must be added to code
- Using Vite
- Using React 18
- Using TypeScript
- Using Material UI
- Using I18n

## 1. Project Overview

### 1.1 Purpose
Develop a comprehensive platform (public website and intranet) to maintain and expose data about companion animals, facilitating identification, tracking, and information management.

### 1.2 Multilingual Support
All developments must be available in 4 languages:
- English
- Français
- Nederlands
- Deutsch

### 1.3 Target Audience
- Companion animal owners
- Veterinarians and veterinary clinics
- Government authorities and regulatory bodies
- Animal shelters and rescue organizations
- Pet adoption agencies

### 1.4 Core Objectives
- Work with existing SQL Database
- Provide secure access to animal records for authorized stakeholders and public access for some features
- Facilitate animal registration, updates, and ownership transfers
- Support lost animal recovery processes
- Enable reporting and analytics for authorities

## 2. Technical Stack

### 2.1 Frontend
- Framework: React with Vite & TypeScript
- UI Library: Material UI
- State Management: React Query
- Styling: Styled Components (with Tailwind CSS as needed)
- API Integration: Axios/React Query
- Form Handling: React Hook Form with Yup validation
- Testing: Jest and React Testing Library

### 2.2 Backend
- API: RESTful API using ASP.NET Core
- ORM: Entity Framework Core
- Database: Microsoft SQL Server
- Authentication: JWT with ASP.NET Identity on an Azure SQL server database
- API Documentation: Swagger/OpenAPI
- Logging: Serilog

### 2.3 DevOps & Infrastructure
- Hosting: Azure App Service
- Database Hosting: Azure SQL
- CI/CD: Azure DevOps or GitHub Actions
- Monitoring: Application Insights
- Security: HTTPS, CORS, input validation, SQL injection prevention

## 3. Functional Requirements

### 3.1 Public Website Features
#### 3.1.1 Animal Registration
- Registration form for new animals
- Assignment of unique identification numbers

#### 3.1.2 Owner Portal
- Secure login for animal owners
- View and update animal information
- Report lost/found animals
- Transfer ownership

#### 3.1.3 Lost & Found System
- Public registry of lost animals
- Reporting mechanism for found animals

#### 3.1.4 Veterinarian Access
*Note: In our application, Veterinarian is known as Identifier*
- Secure professional portal
- Update medical records
- Record microchip registration

### 3.2 Intranet Features
#### 3.2.1 Administrative Dashboard
- User management
- Role-based access control
- System configuration

#### 3.2.2 Data Management
- CRUD operations for all entities
- Bulk import/export capabilities
- Data validation rules

#### 3.2.3 Reporting System
- Statistical reports on registrations
- Geographic distribution
- Species/breed analytics
- Custom report generation

## 4. Data Model (Core Entities)
- Animals
- Owners
- Veterinarians (known as identifiers in our app)
- Identification entity holds data about animal identification like chip number with a link to Identifier entity
  - Can have several identifications for one animal

## 5. Non-Functional Requirements

### 5.1 Performance
- Page load times under 2 seconds
- Database queries optimized for large datasets
- Support for concurrent users (100)

### 5.2 Security
- Data encryption at rest and in transit
- Regular security audits
- GDPR compliance
- Privacy by design
- Captcha security for client

### 5.3 Scalability
- Horizontal scaling capability
- Database partitioning strategy
- Caching implementation

### 5.4 Accessibility
- WCAG 2.1 AA compliance
- Screen reader compatibility
- Keyboard navigation

## 6. API Integration Points

### 6.1 Identity Endpoints
- POST api/identity/login - User authentication
- PATCH api/identity/user - Update user details

### 6.2 Identifier Endpoints
- GET api/identifiers - Retrieve all identifiers
- GET api/identifiers/GetById/{id} - Get specific identifier
- POST api/identifiers - Create new identifier
- PATCH api/identifiers/{id} - Update identifier
- DELETE api/identifiers/{id} - Delete identifier

### 6.3 Identification Endpoints
- GET api/identifications - List identifications
- GET api/identifications/{id} - Get specific identification
- POST api/identifications - Create new identification
- PATCH api/identifications/{id} - Update identification
- DELETE api/identifications/{id} - Delete identification

### 6.4 EPN Sync Endpoints
- GET api/epnsynclog - Get synchronization logs
- GET api/epnsynclog/{id} - Get specific sync log

## 7. User Interface Requirements

### 7.1 General UI Requirements
- Responsive design (mobile, tablet, desktop)
- Accessible according to WCAG 2.1 AA standards
- Consistent branding and styling
- Intuitive navigation
- Loading indicators for asynchronous operations
- Clear error messages and validation feedback

### 7.2 Key Screens
#### 7.2.1 Login/Registration
- Clean, simple forms with validation
- Password strength indicator
- Terms of service acceptance

#### 7.2.2 Dashboard
- Card-based layout for key information
- Quick action buttons
- Recent activity feed
- Summary statistics

#### 7.2.3 Animal List
- Tabular view with sorting and filtering
- Search functionality
- Pagination
- Quick actions (view, edit, delete)

#### 7.2.4 Animal Details
- Comprehensive information display
- Associated identifications
- Edit capabilities
- History/audit log

#### 7.2.5 Identification Management
- Registration form for new chips
- Association with animals
- Status tracking
- History view

#### 7.2.6 User Profile
- Personal information management
- Password change
- Notification preferences
- Account settings

## 8. Development Process

### 8.1 Development Phases
#### 8.1.1 Design Phase
- UI/UX design approval
- Component library setup
- API integration planning

#### 8.1.2 Implementation Phase
- Core functionality development
- API integration
- Unit testing

#### 8.1.3 Testing Phase
- Integration testing
- User acceptance testing
- Performance testing

#### 8.1.4 Deployment Phase
- Staging environment deployment
- Final testing
- Production deployment

### 8.2 Development Practices
- Git-based version control
- Feature branch workflow
- Code reviews for all pull requests
- Continuous integration
- Automated testing

## 9. Implementation Progress

### 9.1 (COMPLETED)
- Created full folder structure for website
- Implemented double navigation with menu on left vertical bar
- Added language switcher on right of top bar
- Implemented i18n
- Created 3 basic pages:
  - Home Page
  - Contact Page
  - GDPR Page

### 9.2 (COMPLETED)
- Added functionality to close/open left navbar on large screens

### 9.3 (COMPLETED)
- Added logo and favicon
- Changed "Vite + React" to "ID Chips" in navbar

### 9.4 (COMPLETED)
- Implemented theme (colors, fonts)
- Created a temporary page with various components to showcase theme

### 9.5 (COMPLETED)
- Focusing on idc-web
- Implementing Apple-like theme
- Applying theme to all pages

### 9.6 (COMPLETED)
- Develop a ThemeShowcase page to showcase them including a maximum of control (buttons, inputs, carousels with companion animals images, etc).
- Hardcode text. Do not use i18n for this page
- Update the theme to the new design

### 9.7 (COMLETED)
- Focusing on idc-web
- Work on Home page.
- Use i18n for the text only English for now
- On the home page we need,
  - a text: Companion Animal Microchip Registration & Database.Protect Your Animal Today
  - a carousel with companion animals images with automatic scrolling (no button) cat, dog, horse, eagle, parrot, pig, fish, turtle

### 9.8 (IN PROGRESS)
- Focusing on idc-web
- Work on Home page.
- Use my own images for the carousel

  

