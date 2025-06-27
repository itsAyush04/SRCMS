# Contributing Guidelines

## 🤝 Welcome Contributors!

Thank you for your interest in contributing to the AI-Assisted Railway Complaint Management System. This document provides guidelines and instructions for contributing to this project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)

## 📜 Code of Conduct

### Our Pledge
We are committed to making participation in this project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards
**Positive behavior includes:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Unacceptable behavior includes:**
- The use of sexualized language or imagery
- Trolling, insulting/derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information without explicit permission

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git version control
- Code editor (VS Code recommended)
- Basic knowledge of React, TypeScript, and Tailwind CSS

### Development Setup
1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub
   # Then clone your fork
   git clone https://github.com/YOUR_USERNAME/railway-complaint-system.git
   cd railway-complaint-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 🔄 Development Workflow

### Branch Naming Convention
- `feature/description` - New features
- `bugfix/description` - Bug fixes
- `hotfix/description` - Critical fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring

### Commit Message Format
```
type(scope): brief description

Detailed explanation of the change (if needed)

Fixes #issue-number
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```bash
feat(complaint-form): add file upload validation
fix(dashboard): resolve chart rendering issue
docs(api): update endpoint documentation
```

## 💻 Coding Standards

### TypeScript Guidelines
```typescript
// Use explicit types
interface ComplaintData {
  id: string;
  subject: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: Date;
}

// Use proper naming conventions
const handleComplaintSubmission = async (data: ComplaintData): Promise<void> => {
  // Implementation
};

// Use meaningful variable names
const isComplaintValid = validateComplaint(complaintData);
const submissionResult = await submitComplaint(complaintData);
```

### React Component Guidelines
```tsx
// Use functional components with hooks
import React, { useState, useEffect } from 'react';

interface Props {
  complaintId: string;
  onStatusChange: (status: string) => void;
}

export const ComplaintStatus: React.FC<Props> = ({ complaintId, onStatusChange }) => {
  const [status, setStatus] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchComplaintStatus();
  }, [complaintId]);

  const fetchComplaintStatus = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await api.getComplaintStatus(complaintId);
      setStatus(response.status);
      onStatusChange(response.status);
    } catch (error) {
      console.error('Failed to fetch status:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="complaint-status">
      {loading ? (
        <div className="animate-spin">Loading...</div>
      ) : (
        <span className={`status-${status}`}>{status}</span>
      )}
    </div>
  );
};
```

### CSS/Tailwind Guidelines
```tsx
// Use semantic class names and consistent spacing
<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <div className="bg-white shadow-lg rounded-lg overflow-hidden">
    <div className="bg-blue-600 px-6 py-4">
      <h1 className="text-2xl font-bold text-white">Page Title</h1>
    </div>
    <div className="p-6 space-y-6">
      {/* Content */}
    </div>
  </div>
</div>

// Use responsive design patterns
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Grid items */}
</div>
```

### File Organization
```
src/
├── components/
│   ├── common/          # Reusable components
│   ├── forms/           # Form-specific components
│   └── layout/          # Layout components
├── pages/               # Page components
├── hooks/               # Custom React hooks
├── utils/               # Utility functions
├── types/               # TypeScript type definitions
├── constants/           # Application constants
└── styles/              # Global styles
```

## 🧪 Testing Guidelines

### Unit Testing
```typescript
// Component testing with React Testing Library
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ComplaintForm } from '../ComplaintForm';

describe('ComplaintForm', () => {
  test('should submit form with valid data', async () => {
    const mockSubmit = jest.fn();
    render(<ComplaintForm onSubmit={mockSubmit} />);
    
    // Fill form fields
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'John Doe' }
    });
    
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'john@example.com' }
    });
    
    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    
    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com'
      });
    });
  });
});
```

### Integration Testing
```typescript
// API integration testing
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.post('/api/complaints/', (req, res, ctx) => {
    return res(ctx.json({ token_id: 'RWY-2024-001234' }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test ComplaintForm.test.tsx
```

## 📚 Documentation

### Code Documentation
```typescript
/**
 * Calculates the priority score for a complaint based on multiple factors
 * @param complaintData - The complaint data object
 * @param sentimentScore - Sentiment analysis score (-1 to 1)
 * @param categoryWeight - Weight factor for the complaint category
 * @returns Priority score (0-100)
 */
export const calculatePriorityScore = (
  complaintData: ComplaintData,
  sentimentScore: number,
  categoryWeight: number
): number => {
  // Implementation
};
```

### README Updates
- Update feature lists when adding new functionality
- Include screenshots for UI changes
- Update installation instructions if dependencies change
- Add usage examples for new components

### API Documentation
- Document new endpoints in `docs/API_DOCUMENTATION.md`
- Include request/response examples
- Specify authentication requirements
- Document error responses

## 🔍 Pull Request Process

### Before Submitting
1. **Ensure code quality**
   ```bash
   npm run lint          # Check for linting errors
   npm run type-check    # TypeScript type checking
   npm test              # Run all tests
   npm run build         # Ensure build succeeds
   ```

2. **Update documentation**
   - Update README if needed
   - Add/update code comments
   - Update API documentation

3. **Test thoroughly**
   - Test on different screen sizes
   - Test with different user roles
   - Test error scenarios

### Pull Request Template
```markdown
## Description
Brief description of changes made.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed
- [ ] Cross-browser testing (if applicable)

## Screenshots (if applicable)
Include screenshots of UI changes.

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Code is commented where necessary
- [ ] Documentation updated
- [ ] No new warnings or errors
```

### Review Process
1. **Automated checks** must pass (linting, tests, build)
2. **Code review** by at least one maintainer
3. **Manual testing** of new features
4. **Documentation review** for completeness
5. **Final approval** and merge

## 🐛 Issue Reporting

### Bug Reports
Use the bug report template:
```markdown
**Bug Description**
A clear description of the bug.

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Expected Behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment**
- OS: [e.g. Windows 10, macOS 12.0]
- Browser: [e.g. Chrome 96, Firefox 95]
- Version: [e.g. 1.2.0]
```

### Feature Requests
```markdown
**Feature Description**
Clear description of the proposed feature.

**Problem Statement**
What problem does this solve?

**Proposed Solution**
How should this feature work?

**Alternatives Considered**
Other solutions you've considered.

**Additional Context**
Any other context or screenshots.
```

## 🏷️ Labels and Milestones

### Issue Labels
- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Improvements or additions to documentation
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention is needed
- `priority: high` - High priority issue
- `status: in progress` - Currently being worked on

### Milestones
- `v1.0.0` - Initial release
- `v1.1.0` - First feature update
- `v2.0.0` - Major version with breaking changes

## 🎉 Recognition

Contributors will be recognized in:
- `CONTRIBUTORS.md` file
- Release notes
- Project documentation
- Annual contributor appreciation

## 📞 Getting Help

- **GitHub Discussions**: For general questions and discussions
- **GitHub Issues**: For bug reports and feature requests
- **Email**: dev-team@railway-complaints.gov.in
- **Documentation**: Check the `docs/` directory

Thank you for contributing to the Railway Complaint Management System! Your efforts help improve public transportation services across India.