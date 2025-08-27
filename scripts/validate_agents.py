#!/usr/bin/env python3
"""
Validation script for ARCHON X agent configurations.
Ensures all MCP tools are properly registered and agents.md is consistent.
"""

import json
import yaml
import sys
import os
from pathlib import Path

def load_agents_config():
    """Load and parse AGENTS.md file."""
    agents_path = Path("AGENTS.md")
    if not agents_path.exists():
        print("❌ AGENTS.md not found")
        return None
    
    with open(agents_path, 'r') as f:
        content = f.read()
    
    # Extract YAML frontmatter
    if content.startswith('---'):
        parts = content.split('---', 2)
        if len(parts) >= 3:
            try:
                return yaml.safe_load(parts[1])
            except yaml.YAMLError as e:
                print(f"❌ Invalid YAML in AGENTS.md: {e}")
                return None
    
    print("❌ No YAML frontmatter found in AGENTS.md")
    return None

def load_mcp_registry():
    """Load MCP registry.json file."""
    registry_path = Path("mcp/registry.json")
    if not registry_path.exists():
        print("❌ mcp/registry.json not found")
        return None
    
    try:
        with open(registry_path, 'r') as f:
            return json.load(f)
    except json.JSONDecodeError as e:
        print(f"❌ Invalid JSON in mcp/registry.json: {e}")
        return None

def validate_services_consistency(agents_config, mcp_registry):
    """Validate that services in AGENTS.md match MCP tools."""
    errors = []
    
    # Get MCP tools from agents config
    agents_mcp_tools = {tool['id']: tool for tool in agents_config.get('mcp_tools', [])}
    
    # Get MCP tools from registry
    registry_mcp_tools = {tool['id']: tool for tool in mcp_registry.get('tools', [])}
    
    # Check that all agents.md tools exist in registry
    for tool_id in agents_mcp_tools:
        if tool_id not in registry_mcp_tools:
            errors.append(f"Tool '{tool_id}' in AGENTS.md not found in MCP registry")
    
    # Check that all registry tools exist in agents.md
    for tool_id in registry_mcp_tools:
        if tool_id not in agents_mcp_tools:
            errors.append(f"Tool '{tool_id}' in MCP registry not found in AGENTS.md")
    
    return errors

def validate_service_endpoints(agents_config):
    """Validate that all services have proper endpoint configurations."""
    errors = []
    
    services = agents_config.get('services_index', {})
    required_fields = ['kind', 'stack']
    
    for service_name, service_config in services.items():
        for field in required_fields:
            if field not in service_config:
                errors.append(f"Service '{service_name}' missing required field '{field}'")
        
        # Check that services with MCP tools have endpoints
        if 'mcp_tool' in service_config and 'endpoints' not in service_config:
            errors.append(f"Service '{service_name}' has MCP tool but no endpoints defined")
    
    return errors

def validate_env_variables():
    """Check that required environment variables are documented."""
    env_example_path = Path(".env.example")
    if not env_example_path.exists():
        return ["❌ .env.example file not found"]
    
    with open(env_example_path, 'r') as f:
        env_content = f.read()
    
    required_vars = [
        'LLAMAINDEX_API_KEY',
        'LLAMAINDEX_PROJECT_ID',
        'PLUTOPRINT_API_URL',
        'PARLANT_API_URL',
        'MOTIA_API_URL',
        'BASEDASH_API_URL'
    ]
    
    errors = []
    for var in required_vars:
        if var not in env_content:
            errors.append(f"Required environment variable '{var}' not found in .env.example")
    
    return errors

def main():
    """Main validation function."""
    print("🔍 Validating ARCHON X agent configurations...")
    
    # Load configurations
    agents_config = load_agents_config()
    mcp_registry = load_mcp_registry()
    
    if not agents_config or not mcp_registry:
        sys.exit(1)
    
    all_errors = []
    
    # Run validations
    print("📋 Checking services consistency...")
    all_errors.extend(validate_services_consistency(agents_config, mcp_registry))
    
    print("🔧 Checking service configurations...")
    all_errors.extend(validate_service_endpoints(agents_config))
    
    print("🌍 Checking environment variables...")
    all_errors.extend(validate_env_variables())
    
    # Report results
    if all_errors:
        print(f"\n❌ Found {len(all_errors)} validation errors:")
        for error in all_errors:
            print(f"  • {error}")
        sys.exit(1)
    else:
        print("\n✅ All validations passed!")
        print("🚀 ARCHON X agent configuration is valid and ready for deployment.")

if __name__ == "__main__":
    main()