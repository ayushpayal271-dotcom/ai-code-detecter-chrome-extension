import { CodePreset, SimulatedPage } from "../types";

export const CODE_PRESETS: CodePreset[] = [
  {
    id: "chatgpt-python-data",
    title: "ChatGPT (GPT-4o) Data Processing Pipeline",
    language: "python",
    category: "ai",
    sourceName: "ChatGPT / GPT-4o Prompt",
    description: "Classic AI pattern: didactic comments ('Step 1: ...', 'Helper function to...'), textbook exception logging, and uniform structure.",
    code: `import json
import logging
from typing import List, Dict, Any, Optional

# Set up standard logging configuration
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

# Step 1: Helper function to sanitize user dictionary keys
def sanitize_record(record: Dict[str, Any]) -> Dict[str, Any]:
    """
    Sanitizes a single record by trimming strings and removing null values.
    
    Args:
        record: The raw input dictionary.
        
    Returns:
        A cleaned dictionary with sanitized values.
    """
    cleaned: Dict[str, Any] = {}
    # Iterate over each key-value pair in the record
    for key, value in record.items():
        if value is not None:
            if isinstance(value, str):
                cleaned[key.strip().lower()] = value.strip()
            else:
                cleaned[key.strip().lower()] = value
    return cleaned

# Step 2: Main data transformation pipeline
def process_user_dataset(raw_dataset: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """
    Processes the raw dataset by applying sanitization and validation rules.
    """
    # Initialize the results list
    processed_results: List[Dict[str, Any]] = []
    
    try:
        # Loop through each item in the raw dataset
        for index, item in enumerate(raw_dataset):
            # Step 2a: Sanitize the record
            sanitized = sanitize_record(item)
            
            # Step 2b: Validate mandatory fields
            if "email" in sanitized and "@" in sanitized["email"]:
                processed_results.append(sanitized)
            else:
                logger.warning(f"Record at index {index} failed email validation")
                
        # Return the final processed list
        return processed_results
    except Exception as e:
        logger.error(f"An unexpected error occurred during processing: {e}")
        raise e
`
  },
  {
    id: "claude-react-hook",
    title: "Claude 3.5 Sonnet React Custom Hook",
    language: "typescript",
    category: "ai",
    sourceName: "Claude 3.5 Sonnet",
    description: "Exemplary LLM layout: explicit type safety, comprehensive JSDoc annotations, polite didactic headers, and standard boilerplate wrapper.",
    code: `import { useState, useEffect, useCallback, useRef } from "react";

interface UseDebounceOptions {
  leading?: boolean;
  trailing?: boolean;
  maxWait?: number;
}

/**
 * Custom React hook to debounce any fast-changing value.
 *
 * @param value - The input value to debounce.
 * @param delay - The debounce delay in milliseconds.
 * @param options - Optional configuration for leading/trailing triggers.
 * @returns The debounced value.
 */
export function useDebounce<T>(
  value: T,
  delay: number = 300,
  options: UseDebounceOptions = {}
): T {
  // Step 1: Initialize the state with the initial value
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Step 2: Set up the timeout effect whenever value or delay changes
  useEffect(() => {
    // Clear existing timeout if it exists
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Set new timer to update state after delay
    timerRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up timer on unmount or when dependencies change
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [value, delay]);

  // Step 3: Return the debounced value
  return debouncedValue;
}
`
  },
  {
    id: "human-legacy-parser",
    title: "Human Developer Legacy Parser (Messy, High Entropy)",
    language: "javascript",
    category: "human",
    sourceName: "Real Production Repo",
    description: "Distinct human traits: terse variable names (buf, p, t0), quick inline hack comments ('// FIXME: edge case from 2021'), inconsistent spacing, and zero step-by-step tutorial phrasing.",
    code: `function parseChunk(raw, opt) {
  // FIXME: Safari 14 bug sends null byte at offset 0
  if (!raw || raw.length < 4) return null;
  let p = raw[0] === 0x00 ? 1 : 0;

  const len = raw.readUInt16BE(p);
  p += 2;
  
  // quick check for overflow
  if (p + len > raw.length) {
    console.warn('chunk truncated, dropping frame');
    return null;
  }

  const payload = raw.slice(p, p + len);
  p += len;

  // tag: 0xFA = sync, 0xFB = ack
  const tag = raw[p++];
  const isAck = (tag & 0x01) === 1;

  return {
    bytes: payload,
    ack: isAck,
    _rawLen: len, // temp debug
    rem: raw.slice(p)
  };
}
`
  },
  {
    id: "copilot-express-auth",
    title: "GitHub Copilot Express Authentication Middleware",
    language: "typescript",
    category: "ai",
    sourceName: "Copilot Tab Completion",
    description: "Standard Copilot auto-completion: generic variable naming, cookie-cutter token splitting, textbook 401/403 status codes with generic messages.",
    code: `import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Middleware to authenticate JWT tokens
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // Get auth header value
  const authHeader = req.headers["authorization"];
  // Format is "Bearer TOKEN"
  const token = authHeader && authHeader.split(" ")[1];

  // Check if token exists
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access token is missing or unauthorized"
    });
  }

  // Verify the token with the secret key
  jwt.verify(token, process.env.JWT_SECRET || "default_secret", (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: "Invalid or expired token"
      });
    }
    // Attach user payload to request
    (req as any).user = user;
    next();
  });
};
`
  },
  {
    id: "leetcode-solution-bot",
    title: "LeetCode Bot Solution (Two Sum & Graphs)",
    language: "python",
    category: "ai",
    sourceName: "LeetCode LLM Bot Submission",
    description: "Textbook algorithmic solution with standard complexity annotations and step-by-step logic markers.",
    code: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        """
        Finds two numbers that add up to target.
        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        # Step 1: Create a hash map to store value -> index mapping
        seen_map = {}
        
        # Step 2: Iterate through the array with index and number
        for index, num in enumerate(nums):
            # Calculate the required complement
            complement = target - num
            
            # Check if complement already exists in our hash map
            if complement in seen_map:
                # Return the indices of the two numbers
                return [seen_map[complement], index]
            
            # Store current number with its index for future lookups
            seen_map[num] = index
            
        # Return empty list if no valid pair found
        return []
`
  }
];

export const SIMULATED_PAGES: SimulatedPage[] = [
  {
    id: "github-pr-128",
    siteName: "GitHub",
    title: "PR #128: Add payment webhook verification & retry queue",
    url: "https://github.com/acme-corp/billing-service/pull/128/files",
    author: "dev-alex (New Contributor)",
    timestamp: "12 minutes ago",
    description: "Reviewing pull request changes in billing-service backend.",
    codeBlocks: [
      {
        id: "gh-block-1",
        language: "typescript",
        label: "src/webhooks/verifySignature.ts",
        preCalculatedScore: 89,
        verdict: "AI-Generated",
        generator: "ChatGPT (GPT-4o)",
        code: `import crypto from "crypto";

// Step 1: Helper function to verify Stripe HMAC signature
export function verifyStripeSignature(payload: string, signature: string, secret: string): boolean {
  try {
    // Step 1a: Split timestamp and signature hash
    const parts = signature.split(",");
    const timestamp = parts.find(p => p.startsWith("t="))?.split("=")[1];
    const hash = parts.find(p => p.startsWith("v1="))?.split("=")[1];

    if (!timestamp || !hash) {
      console.error("Malformed signature headers received");
      return false;
    }

    // Step 2: Create expected HMAC digest
    const signedPayload = \`\${timestamp}.\${payload}\`;
    const expectedHash = crypto
      .createHmac("sha256", secret)
      .update(signedPayload, "utf8")
      .digest("hex");

    // Step 3: Constant time comparison to prevent timing attacks
    return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(expectedHash));
  } catch (error) {
    // Catch and log any verification errors
    console.error("Error verifying signature:", error);
    return false;
  }
}`
      },
      {
        id: "gh-block-2",
        language: "typescript",
        label: "src/webhooks/legacyStore.ts",
        preCalculatedScore: 18,
        verdict: "Human-Authored",
        generator: "Human Developer",
        code: `// db connection retry hack for redis cluster v6
let _pool = null;
export async function getClient() {
  if (_pool && _pool.isOpen) return _pool;
  _pool = createPool({ url: process.env.REDIS_URL, timeout: 2000 });
  _pool.on('error', (e) => {
    // ignore transient socket closed during rollover
    if (e.code === 'ECONNRESET') return;
    console.error('fatal redis:', e);
  });
  await _pool.connect();
  return _pool;
}`
      }
    ]
  },
  {
    id: "leetcode-contest-402",
    siteName: "LeetCode",
    title: "Problem 3142: Minimum Operations to Form Subsequence",
    url: "https://leetcode.com/problems/minimum-operations/solutions/589211/",
    author: "coder_9918 (Rank 12)",
    timestamp: "3 hours ago",
    description: "Contest solution submission under plagiarism & bot check.",
    codeBlocks: [
      {
        id: "lc-block-1",
        language: "python",
        label: "Solution.py",
        preCalculatedScore: 94,
        verdict: "AI-Generated",
        generator: "Claude 3.5 Sonnet / LLM Bot",
        code: `class Solution:
    def minOperations(self, nums: List[int], target: int) -> int:
        """
        Calculates the minimum operations required to satisfy target sum.
        Utilizes a greedy bit manipulation approach with counts array.
        """
        # Step 1: Initialize frequency map for powers of two
        count = [0] * 32
        total_sum = 0
        
        # Step 2: Populate bit counts and total sum
        for num in nums:
            total_sum += num
            count[int(math.log2(num))] += 1
            
        # If total sum is strictly less than target, impossible
        if total_sum < target:
            return -1
            
        # Step 3: Iterate through all 31 bit positions
        operations = 0
        i = 0
        while i < 31:
            # Check if target requires the i-th bit
            if (target >> i) & 1:
                if count[i] > 0:
                    count[i] -= 1
                else:
                    # Find the nearest available higher power of two
                    j = i
                    while j < 31 and count[j] == 0:
                        j += 1
                    count[j] -= 1
                    while j > i:
                        j -= 1
                        count[j] += 1
                        operations += 1
            count[i + 1] += count[i] // 2
            i += 1
            
        return operations`
      }
    ]
  },
  {
    id: "stackoverflow-thread-789",
    siteName: "StackOverflow",
    title: "How to recursively search nested JSON object in Node.js?",
    url: "https://stackoverflow.com/questions/8912344/recursive-json-search",
    author: "tech_guru_24 (Top Answer)",
    timestamp: "1 day ago",
    description: "Checking user answer for suspected copy-paste from ChatGPT.",
    codeBlocks: [
      {
        id: "so-block-1",
        language: "javascript",
        label: "Answer snippet (Node.js)",
        preCalculatedScore: 91,
        verdict: "AI-Generated",
        generator: "ChatGPT (GPT-4o)",
        code: `// Here is a clean, recursive helper function to find all occurrences of a key:

function findNestedKeys(obj, targetKey, results = []) {
  // Base case: Check if input is a valid object
  if (!obj || typeof obj !== "object") {
    return results;
  }

  // Step 1: Loop through each property in the object
  for (const [key, value] of Object.entries(obj)) {
    // If key matches target, push to results list
    if (key === targetKey) {
      results.push(value);
    }

    // Step 2: Recursively inspect child objects or arrays
    if (typeof value === "object" && value !== null) {
      findNestedKeys(value, targetKey, results);
    }
  }

  // Return the accumulated results
  return results;
}

// Example usage:
// const data = { user: { profile: { id: 101, meta: { id: 202 } } } };
// console.log(findNestedKeys(data, "id")); // [101, 202]`
      }
    ]
  }
];
