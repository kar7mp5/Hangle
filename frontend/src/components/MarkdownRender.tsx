// MarkdownRenderer.tsx
import React from 'react';
import MarkdownPreview from '@uiw/react-markdown-preview';

interface MarkdownProps {
    markdownContent: string;
}

const MarkdownRenderer: React.FC<MarkdownProps> = ({ markdownContent }) => {
    return (
        <div>
            <MarkdownPreview source={markdownContent} />
        </div>
    );
};

export default MarkdownRenderer;